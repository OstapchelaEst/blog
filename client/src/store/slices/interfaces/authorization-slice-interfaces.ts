import { IResponseErrors } from 'http/fetch/fetch-interfaces';

export interface IUserData {
  login: string;
  email: string;
  userId: string;
  accessToken: string;
}

export interface IResponseError {
  message: string;
  errors: IResponseErrors[];
}

export interface IInitialStateAuthorization {
  userData: IUserData | null;
  responseErrors: string;
  isAuth: boolean;
}
