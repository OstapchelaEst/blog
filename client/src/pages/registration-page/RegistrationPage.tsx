import { Box, Button, FormHelperText, Typography } from '@mui/material';
import CustomInput from 'components/UI/CustomInput';
import React, { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import { fetchCreateUser } from 'store/async-actions/registration';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';

import { AuthorizationSlice } from 'store/slices/authorization-slice';
import { IResponseError } from 'store/slices/interfaces';

const validationFirstPassord = (firstPassword: string): true | string => {
  return firstPassword.length > 5 ? true : 'Миниму 6 символа';
};

const validationSecondPassword = (
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

const validationEmail = (email: string): true | string => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return EMAIL_REGEXP.test(email) ? true : 'Не валидный E-mail';
};

export interface IAuthUser {
  login: string;
  email: string;
  password: string;
  passwordTwo?: string;
}

const RegistrationPage = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetResponseError } = AuthorizationSlice.actions;
  const { responseErrors, isAuth } = useAppSelector((state) => state.AuthorizationSlice);

  const onSubmit = async (data: FieldValues | IAuthUser) => {
    const { login, email, password } = data;
    const response = await dispatch(fetchCreateUser({ login, email, password }));

    if (response.type === 'create-user/rejected') {
      const errors = (response.payload as IResponseError).errors;
      errors.forEach((error) => {
        const nameFild = Object.keys(error).join('');
        const messageError = Object.values(error).join('');
        setError(nameFild, { type: 'custom', message: messageError });
      });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetResponseError());
    };
  }, [dispatch, resetResponseError]);

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Box
      sx={{
        flex: '1 1',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          p: 4,
          border: '10px solid #5595ff',
          borderRadius: 5,
          backgroundColor: 'rgb(245, 255, 255)',
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontSize: 34,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 5,
            textAlign: 'center',
            mb: 3,
          }}
        >
          Registration
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="login"
            control={control}
            label="Login"
            type="text"
            fullWidth
            rules={{
              required: true,
              validate: {
                customFN: (value) => {
                  return value.length > 2 ? true : 'Миниму 3 символа';
                },
              },
            }}
            sx={{ mb: 1 }}
          />
          <CustomInput
            name="email"
            control={control}
            label="E-mail"
            type="email"
            fullWidth
            sx={{ mb: 1 }}
            rules={{
              required: true,
              validate: {
                customFN: validationEmail,
              },
            }}
          />
          <CustomInput
            name="password"
            control={control}
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            rules={{
              required: true,
              validate: {
                customFN: validationFirstPassord,
              },
            }}
          />
          <CustomInput
            name="passwordTwo"
            control={control}
            label="Repit password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            rules={{
              required: true,
              validate: {
                customFN: validationSecondPassword,
              },
            }}
          />
          <FormHelperText error sx={{ mb: 1 }}>
            {responseErrors}
          </FormHelperText>
          <Button disabled={!isValid} type={'submit'} fullWidth={true} variant="contained">
            {'Submit'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
