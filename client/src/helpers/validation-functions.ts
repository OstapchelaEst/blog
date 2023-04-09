import { IResponseErrors } from 'http/fetch/fetch-interfaces';
import { ErrorOption, FieldValues } from 'react-hook-form';

export const validationLengthPost = (str: string): string | true => {
  return str.length > 140 ? 'Maximum length 140 symbols' : true;
};

export const validationFirstPassord = (firstPassword: string): true | string => {
  return firstPassword.length > 5 ? true : 'Minimum 6 symbols';
};

export const validationSecondPassword = (
  secondPassword: string,
  formValues: FieldValues
): true | string => {
  const firstPassword = formValues.password;
  if (firstPassword) {
    if (firstPassword === secondPassword) {
      return validationFirstPassord(secondPassword);
    }
  } else {
    return 'First password field is empty';
  }
  return 'Passwords are not the same';
};

export const validationEmail = (email: string): true | string => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return EMAIL_REGEXP.test(email) ? true : 'Email is not valid';
};

export const setValidationErrors = (
  errors: IResponseErrors[],
  setError: (
    name: string,
    error: ErrorOption,
    options?:
      | {
          shouldFocus: boolean;
        }
      | undefined
  ) => void
): void => {
  errors.forEach((error) => {
    const data = Object.entries(error)[0];
    const nameFild = data[0];
    const messageError = data[1];
    setError(nameFild, { type: 'custom', message: messageError });
  });
};
