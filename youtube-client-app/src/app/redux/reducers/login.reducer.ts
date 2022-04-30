import { createReducer, on } from '@ngrx/store';
import {
  resetUserInfo,
  setCardIsCreated,
  setUserInfo,
  toggleIsLoggedIn,
} from '../actions/login.actions';
import { ILoginReducer } from '../state.model';

const initialState: ILoginReducer = {
  isLoggedIn: false,
  cardIsCreated: false,
  loggedUserInfo: null,
};

export const loginReducer = createReducer(
  initialState,
  on(setUserInfo, (state, { loggedUserInfo }) => {
    const isLoggedIn = loggedUserInfo ? true : false;

    return {
      ...state,
      isLoggedIn,
      loggedUserInfo,
    };
  }),
  on(resetUserInfo, (state) => ({
    ...state,
    isLoggedIn: false,
    loggedUserInfo: null,
  })),
  on(toggleIsLoggedIn, (state) => ({
    ...state,
    isLoggedIn: !state.isLoggedIn,
  })),
  on(setCardIsCreated, (state) => ({
    ...state,
    cardIsCreated: !state.cardIsCreated,
  }))
);
