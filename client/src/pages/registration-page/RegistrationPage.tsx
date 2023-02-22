import { Box, Typography } from '@mui/material';
import RegistrationForm from 'components/RegistrationForm';
import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';

export interface IAuthUser {
  login: string;
  email: string;
  password: string;
  passwordTwo?: string;
}

const RegistrationPage = () => {
  const isAuth = useAppSelector((state) => state.AuthorizationSlice.isAuth);
  const navigate = useNavigate();
  if (isAuth) {
    navigate('/');
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
        <RegistrationForm />
      </Box>
    </Box>
  );
};

export default RegistrationPage;
