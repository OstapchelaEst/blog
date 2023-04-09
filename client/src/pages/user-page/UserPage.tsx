import { Avatar, Box, Typography } from '@mui/material';
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
  const spanStyles = {
    fontWeight: 900,
    color: '#1976d2 ',
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90%' }}>
      <Box
        sx={{
          wordBreak: 'break-word',
          maxWidth: '70%',
          backgroundColor: 'white',
          p: 3,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', columnGap: 3, alignItems: 'center' }}>
          <Avatar
            sx={{ border: '5px solid #1976d2', width: 100, height: 100, fontSize: 45, mb: 2 }}
          >
            {userData.login[0]}
          </Avatar>
          <Box>
            <Typography sx={{ mb: 1 }}>
              <span style={spanStyles}>Login:</span> {userData.login}
            </Typography>
            <Typography>
              <span style={spanStyles}>Email:</span> {userData.email}
            </Typography>
          </Box>
        </Box>
        <Typography>
          <span style={spanStyles}>ID:</span> {userData.userId}
        </Typography>
        <Typography>
          <span style={spanStyles}>Token:</span> {userData.accessToken}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserPage;
