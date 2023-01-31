import { Box, Button, Typography } from '@mui/material';
import CustomInput from 'components/UI/CustomInput';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const AuthorizationPage = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'onBlur' });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
            name="password"
            control={control}
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 1 }}
            rules={{
              required: true,
              validate: {
                customFN: (value) => {
                  return value.length > 7 ? true : 'Миниму 8 символа';
                },
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

export default AuthorizationPage;
