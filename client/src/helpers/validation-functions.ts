import { FieldValues } from 'react-hook-form';

export const validationLengthPost = (str: string): string | true => {
  return str.length > 140 ? 'Maximum length 140 symbols' : true;
};

export const validationFirstPassord = (firstPassword: string): true | string => {
  return firstPassword.length > 5 ? true : 'Миниму 6 символа';
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
    return 'Пароль в первом поле не введён';
  }
  return 'Пароли не одинаковы';
};

export const validationEmail = (email: string): true | string => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return EMAIL_REGEXP.test(email) ? true : 'Не валидный E-mail';
};
