export interface IResponseErrors {
  location: string;
  msg: string;
  param: string;
}

export interface IResponseErrorBody {
  errors: IResponseErrors[];
  message: string;
}
