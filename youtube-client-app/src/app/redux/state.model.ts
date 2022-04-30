import { ILoggedUser } from '../auth/models/user.model';

export interface IState {
  loginReducer: ILoginReducer;
  youtubeReducer: IYoutubeReducer;
}

export interface ILoginReducer {
  cardIsCreated: boolean;
  isLoggedIn: boolean;
  loggedUserInfo: ILoggedUser | null;
}

export interface IYoutubeReducer {}
