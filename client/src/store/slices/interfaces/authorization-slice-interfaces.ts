import { IResponseErrors } from 'http/fetch/fetch-interfaces';

export interface IUserData {
  login: string;
  email: string;
  userId: string;
  accessToken: string;
  _id: string;
  iat: number;
  exp: number;
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
