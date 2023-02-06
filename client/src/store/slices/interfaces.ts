export interface IUserData {
  login: string;
  email: string;
  userId: string;
  accessToken: string;
}

export interface IResponseError {
  message: string;
  errors: Array<{ string: string }>;
}

export interface IState {
  userData: IUserData | null;
  responseErrors: string;
  isAuth: boolean;
}
