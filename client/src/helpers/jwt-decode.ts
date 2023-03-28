import { IUserData } from 'store/slices/interfaces/authorization-slice-interfaces';

interface IParseJwt {
  login: string;
  email: string;
  userId: string;
  iat: number;
  exp: number;
  _id: string;
}

export const parseJwt = (token: string | null): IUserData | null => {
  if (token === null) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  console.log(JSON.parse(jsonPayload));
  const data = JSON.parse(jsonPayload);
  return { ...data, accessToken: token };
};

export const checkValidToken = (token: string | null): boolean => {
  if (token === null) return false;
  const decodedToken = parseJwt(token) as IUserData;
  const dateEnd = decodedToken.exp;
  const getNowDate = Date.now();
  console.log(dateEnd < getNowDate);
  return dateEnd < getNowDate ? true : false;
};
