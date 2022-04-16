import { v1 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoggedUser } from '../models/user.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { debounceTime, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  pullLoginInfo = (): ILoggedUser | null => {
    const userInfo = window.localStorage.getItem('user');

    this.isLoggedIn = userInfo?.length ? true : false;

    return userInfo ? JSON.parse(userInfo) : null;
  };

  logged$ = new Subject<boolean>();

  createdCard$ = new Subject<boolean>();

  cardIsCreated = false;

  isLoggedIn = false;

  loggedUserInfo: ILoggedUser | null = this.pullLoginInfo();

  redirectUrl: string = 'videos';

  namePattern = /^[A-zА-я\s]{3,}$/i;

  passwordPattern = /^[\w\W]{8,}$/i;

  enhancedPasswordPattern =
    /([A-Z]+)(([a-z]*)?)([\W\d]+)|([\W\d]+)(([a-z]*)?)([A-Z]+)|([A-Z]+)(([a-z]*)?)([A-Z]+)|([\W]+)(([a-z]*)?)([\W\d]+)/g;

  urlPattern = /^((https?[\:]\/\/)www[\.])[a-z]*.[a-z]{2,}\/[\w\W]*/;

  user!: FormGroup;

  admin!: FormGroup;

  youtubeService: YoutubeService;

  constructor(
    fb: FormBuilder,
    private router: Router,
    youtubeService: YoutubeService
  ) {
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

    const user = { name: f.value.name, token: uuid() } as ILoggedUser;

    this.logged$.next(true);

    this.loggedUserInfo = user;

    this.commitLoginInfo('user', user);

    this.isAdmin()
      ? this.router.navigate(['admin'])
      : this.router.navigate([this.redirectUrl]);
  };

  isAdmin() {
    return this.name?.value === 'admin';
  }

  logout = (): void => {
    this.youtubeService.reset();
    window.localStorage.clear();
    this.logged$.next(false);
    this.loggedUserInfo = null;
    this.router.navigate(['/login']);
  };

  createCard(f: FormGroup) {
    this.createdCard$.next(true);

    f.reset();
  }
}
