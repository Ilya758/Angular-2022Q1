import { v1 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoggedUser } from '../models/user.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectCardIsCreated,
  selectIsLoggedIn,
} from 'src/app/redux/selectors/login.selectors';
import { IState } from 'src/app/redux/state.model';
import {
  resetUserInfo,
  setCardIsCreated,
  setUserInfo,
} from 'src/app/redux/actions/login.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  pullLoginInfo = (): void => {
    const userInfo = window.localStorage.getItem('user');

    const loggedUserInfo: ILoggedUser | null = userInfo
      ? JSON.parse(userInfo)
      : null;

    this.store.dispatch(setUserInfo({ loggedUserInfo }));
  };

  redirectUrl: string = 'videos';

  namePattern = /^[A-zА-я\s]{3,}$/i;

  passwordPattern = /^[\w\W]{8,}$/i;

  enhancedPasswordPattern =
    /([A-Z]+)(([a-z]*)?)([\W\d]+)|([\W\d]+)(([a-z]*)?)([A-Z]+)|([A-Z]+)(([a-z]*)?)([A-Z]+)|([\W]+)(([a-z]*)?)([\W\d]+)/g;

  urlPattern = /^((https?[\:]\/\/)www[\.])[a-z]*.[a-z]{2,}\/[\w\W]*/;

  user!: FormGroup;

  admin!: FormGroup;

  isLoggedIn$: Observable<boolean>;

  cardIsCreated$: Observable<boolean>;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private youtubeService: YoutubeService,
    private store: Store<IState>
  ) {
    this.isLoggedIn$ = store.select(selectIsLoggedIn);
    this.cardIsCreated$ = store.select(selectCardIsCreated);

    this.pullLoginInfo();

    this.youtubeService = youtubeService;
    this.user = fb.group(
      {
        name: ['', [Validators.pattern(this.namePattern)]],
        password: [
          '',
          [
            Validators.pattern(this.passwordPattern),
            Validators.pattern(this.enhancedPasswordPattern),
          ],
        ],
      },
      { updateOn: 'blur' }
    );
    this.admin = fb.group(
      {
        title: [
          '',
          [
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.required,
          ],
        ],
        description: ['', Validators.maxLength(255)],
        linkImg: ['', [Validators.pattern(this.urlPattern)]],
        linkVideo: ['', [Validators.pattern(this.urlPattern)]],
      },
      { updateOn: 'blur' }
    );
  }

  commitLoginInfo = (key: string, data: unknown): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };

  get name() {
    return this.user.get('name');
  }

  get password() {
    return this.user.get('password');
  }

  get title() {
    return this.admin.get('title');
  }

  get description() {
    return this.admin.get('description');
  }

  get linkImg() {
    return this.admin.get('linkImg');
  }

  get linkVideo() {
    return this.admin.get('linkVideo');
  }

  login = (f: FormGroup): void => {
    if (f.invalid) {
      return;
    }

    const loggedUserInfo = {
      name: f.value.name,
      token: uuid(),
    } as ILoggedUser;

    this.store.dispatch(setUserInfo({ loggedUserInfo }));

    this.commitLoginInfo('user', loggedUserInfo);

    f.reset();

    this.isAdmin(loggedUserInfo.name)
      ? this.router.navigate(['admin'])
      : this.router.navigate([this.redirectUrl]);
  };

  isAdmin(name: string) {
    return name === 'admin';
  }

  logout = (): void => {
    this.youtubeService.reset();
    window.localStorage.clear();
    this.store.dispatch(resetUserInfo());
    this.router.navigate(['/login']);
  };

  createCard(f: FormGroup) {
    this.store.dispatch(setCardIsCreated());

    f.reset();
  }
}
