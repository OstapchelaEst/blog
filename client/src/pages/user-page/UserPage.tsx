import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
const UserPage = () => {
  const { isAuth, userData } = useAppSelector((state) => state.AuthorizationSlice);
  const navigate = useNavigate();
  if (!isAuth || userData === null) {
    navigate('/');
    return null;
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
