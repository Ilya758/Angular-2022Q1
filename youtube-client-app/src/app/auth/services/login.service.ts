import { v1 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoggedUser } from '../models/user.model';
import { YoutubeService } from 'src/app/youtube/services/youtube.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  pullLoginInfo = (): ILoggedUser | null => {
    const userInfo = window.localStorage.getItem('user');

    this.isLoggedIn = userInfo?.length ? true : false;

    return userInfo ? JSON.parse(userInfo) : null;
  };

  isLoggedIn = false;

  loggedUserInfo: ILoggedUser | null = this.pullLoginInfo();

  redirectUrl: string = 'videos';

  namePattern = /^[A-z\s]{3,}$/i;

  passwordPattern = /^[a-z0-9]{4,}$/i;

  user!: FormGroup;

  youtubeService: YoutubeService;

  constructor(
    fb: FormBuilder,
    private router: Router,
    youtubeService: YoutubeService
  ) {
    this.youtubeService = youtubeService;
    this.user = fb.group({
      name: ['', [Validators.pattern(this.namePattern)]],
      password: ['', Validators.pattern(this.passwordPattern)],
    });
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

    const user = { ...f.value, token: uuid() } as ILoggedUser;

    this.isLoggedIn = true;

    this.loggedUserInfo = user;

    this.commitLoginInfo('user', user);
    this.router.navigate([this.redirectUrl]);
  };

  logout = (): void => {
    this.youtubeService.reset();
    window.localStorage.clear();
    this.isLoggedIn = false;
    this.loggedUserInfo = null;
    this.router.navigate(['/login']);
  };
}
