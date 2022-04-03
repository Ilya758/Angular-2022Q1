export interface IUser {
  name: string;
  password: string;
}

export interface ILoggedUser extends IUser {
  token: string;
}
