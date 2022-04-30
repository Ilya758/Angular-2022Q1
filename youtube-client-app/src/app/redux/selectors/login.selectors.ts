import { IState } from '../state.model';

export const selectIsLoggedIn = ({ loginReducer: { isLoggedIn } }: IState) =>
  isLoggedIn;

export const selectCardIsCreated = ({
  loginReducer: { cardIsCreated },
}: IState) => cardIsCreated;

export const selectUserInfo = ({ loginReducer: { loggedUserInfo } }: IState) =>
  loggedUserInfo;
