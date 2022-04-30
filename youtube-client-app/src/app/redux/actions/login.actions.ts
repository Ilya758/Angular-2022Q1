import { createAction, props } from '@ngrx/store';
import { ILoggedUser } from 'src/app/auth/models/user.model';

export const setUserInfo = createAction(
  '[Login] setUserInfo',
  props<{ loggedUserInfo: ILoggedUser | null }>()
);

export const resetUserInfo = createAction('[Login] resetUserInfo');

export const toggleIsLoggedIn = createAction('[Login] setIsLoggedIn');

export const setCardIsCreated = createAction('[Login] setCardIsCreated');
