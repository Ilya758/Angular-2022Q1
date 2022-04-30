import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { IState } from 'src/app/redux/state.model';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn!: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private store: Store<IState>
  ) {
    this.store.subscribe(({ loginReducer: { isLoggedIn } }) => {
      if (!this.isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { url } = state;

    return this.checkLogin(url);
  }

  checkLogin = async (url: string): Promise<boolean | UrlTree> => {
    if (this.isLoggedIn) {
      if (url === '/') this.router.navigate(['/videos']);

      return true;
    }

    this.loginService.redirectUrl = url;
    this.router.navigate(['/login']);
    return this.router.parseUrl(url);
  };
}
