import { v1 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoggedUser } from '../models/user.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';
import { Subject } from 'rxjs';

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

  isLoggedIn = false;

  loggedUserInfo: ILoggedUser | null = this.pullLoginInfo();

  redirectUrl: string = 'videos';

  namePattern = /^[A-zА-я\s]{3,}$/i;

  passwordPattern = /^[\w\W]{8,}$/i;

  enhancedPasswordPattern =
    /([A-Z]+)(([a-z]*)?)([\W\d]+)|([\W\d]+)(([a-z]*)?)([A-Z]+)|([A-Z]+)(([a-z]*)?)([A-Z]+)|([\W]+)(([a-z]*)?)([\W\d]+)/g;

  user!: FormGroup;

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

  login = (f: FormGroup): void => {
    if (f.invalid) {
      return;
    }

    const user = { name: f.value.name, token: uuid() } as ILoggedUser;

    this.logged$.next(true);

    this.loggedUserInfo = user;

    this.commitLoginInfo('user', user);
    this.router.navigate([this.redirectUrl]);
  };

  logout = (): void => {
    this.youtubeService.reset();
    window.localStorage.clear();
    this.logged$.next(false);
    this.loggedUserInfo = null;
    this.router.navigate(['/login']);
  };
}
