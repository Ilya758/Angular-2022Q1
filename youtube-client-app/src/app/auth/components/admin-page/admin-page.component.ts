import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

import { Subscription, timer } from 'rxjs';
import { IState } from 'src/app/redux/state.model';
import { Store } from '@ngrx/store';
import { setCardIsCreated } from 'src/app/redux/actions/login.actions';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit, OnDestroy {
  loginService!: LoginService;

  observer$!: Subscription;

  constructor(loginService: LoginService, private store: Store<IState>) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    this.observer$ = this.store.subscribe(
      ({ loginReducer: { cardIsCreated } }) => {
        if (cardIsCreated) {
          timer(1000).subscribe(() => this.store.dispatch(setCardIsCreated()));
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.observer$.unsubscribe();
  }
}
