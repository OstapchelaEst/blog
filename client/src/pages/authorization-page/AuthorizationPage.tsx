import { Box, Button, FormHelperText, Typography } from '@mui/material';
import CustomInput from 'components/UI/CustomInput';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { fetchAuthorizationUser } from 'store/async-actions/authorization/authorization';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { AuthorizationSlice } from 'store/slices/authorization-slice';
import { IAuthUser } from '../registration-page/RegistrationPage';

const AuthorizationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { responseErrors, isAuth } = useAppSelector((state) => state.AuthorizationSlice);
  const { resetResponseError } = AuthorizationSlice.actions;

  const onSubmit = async (data: FieldValues | Omit<IAuthUser, 'login'>) => {
    try {
      await dispatch(fetchAuthorizationUser(data as Omit<IAuthUser, 'login'>)).unwrap();
      navigate('/posts');
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      dispatch(resetResponseError());
    };
  }, [resetResponseError, dispatch]);

  if (isAuth) {
    navigate('/');
    return null;
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
          p: 3,
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
          AUTHORIZATION
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="email"
            control={control}
            label="Email"
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
            name="password"
            control={control}
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            rules={{
              required: true,
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

export default AuthorizationPage;
