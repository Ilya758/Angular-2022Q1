import { ILoggedUser } from '../auth/models/user.model';
import { IItem } from '../youtube/models/search-item.model';

export interface IState {
  loginReducer: ILoginReducer;
  youtubeReducer: IYoutubeReducer;
  filterReducer: IFilterReducer;
}

export interface ILoginReducer {
  cardIsCreated: boolean;
  isLoggedIn: boolean;
  loggedUserInfo: ILoggedUser | null;
}

export interface IYoutubeReducer {
  currentVideoInformation: IItem | null;
  dataIsLoading: boolean;
  fetchedData: IItem[] | null;
  filteringBlockIsVisible: boolean;
  ids: string;
}

export interface IFilterReducer {
  dateByAsc: boolean;
  viewsByAsc: boolean;
  keyword: string;
}
