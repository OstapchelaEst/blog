import { Typography } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
const UserPage = () => {
  const { isAuth, userData } = useAppSelector((state) => state.AuthorizationSlice);

  if (!isAuth || userData === null) {
    return <Navigate to={'/authorization'} />;
  }

  return (
    <div>
      <Typography>Login: {userData.login}</Typography>
      <Typography>Email: {userData.email}</Typography>
      <Typography>ID: {userData.userId}</Typography>
      <Typography>Token: {userData.accessToken}</Typography>
    </div>
  );
};

export default UserPage;
