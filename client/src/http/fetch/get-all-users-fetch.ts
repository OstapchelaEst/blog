import $api from 'http/axios-instance';
import { IUserData } from 'store/slices/interfaces/authorization-slice-interfaces';
import { IResponseErrorBody } from './fetch-interfaces';

export const getAllUserFetch = async () => {
  return $api
    .get('/all-users')
    .then<IUserData[]>((response) => response.data)
    .catch<IResponseErrorBody>((err) => {
      throw err.response;
    });
};
