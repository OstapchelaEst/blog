import { Button } from '@mui/material';
import {
  setValidationErrors,
  validationEmail,
  validationFirstPassord,
  validationSecondPassword,
} from 'helpers/validation-functions';
import { IAuthUser } from 'pages/registration-page/RegistrationPage';
import React, { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { fetchCreateUser } from 'store/async-actions/authorization/registration';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';
import { AuthorizationSlice } from 'store/slices/authorization-slice';
import { IResponseError } from 'store/slices/interfaces/authorization-slice-interfaces';
import CustomInput from './UI/CustomInput';

const RegistrationForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid },
  } = useForm({ mode: 'onTouched' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetResponseError } = AuthorizationSlice.actions;

  const onSubmit = async (data: FieldValues | IAuthUser) => {
    const { login, email, password } = data;
    try {
      await dispatch(fetchCreateUser({ login, email, password })).unwrap();
      navigate('/');
    } catch (error) {
      const errors = (error as IResponseError).errors;
      setValidationErrors(errors, setError);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetResponseError());
    };
  }, [dispatch, resetResponseError]);

  return (
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
      <Button disabled={!isValid} type={'submit'} fullWidth={true} variant="contained">
        {'Submit'}
      </Button>
    </form>
  );
};

export default RegistrationForm;
