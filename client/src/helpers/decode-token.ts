import jwtDecode from 'jwt-decode';

export interface IUserDataResponse {
  login: string;
  email: string;
  userId: string;
  iat: number;
  exp: number;
}

const decodeJWT = (token: string): IUserDataResponse => {
  return jwtDecode(token);
};
