import { Box, Button, Typography } from '@mui/material';
import CustomInput from 'components/UI/CustomInput';
import React from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { fetchCreateUser } from 'store/async-actions/authorization';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';

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

const RegistrationPage = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    dispatch(fetchCreateUser());
  };

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
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontSize: 34,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 5,
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
            name="password-2"
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
      </Box>
    </Box>
  );
};

export default RegistrationPage;
