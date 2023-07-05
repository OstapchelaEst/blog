import { Avatar, Box, Typography } from '@mui/material';
import { StatisticPostsAndLikes } from 'components/statistics/StatisticPostsAndLikes';
import { UserCardWrapper } from 'components/user-card/UserCardWrapper';
import { UserLoginAndEmail } from 'components/user-card/UserLoginAndEmail';
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90%',
        flexDirection: 'column',
        maxWidth: '80vw',
        gap: 3,
        m: '0 auto',
      }}
    >
      <UserCardWrapper>
        <>
          <UserLoginAndEmail
            login={userData.login}
            email={userData.email}
            avatarSettings={{
              border: '5px solid #1976d2',
              width: 100,
              height: 100,
              fontSize: 45,
              mb: 2,
            }}
            withAvatar={true}
          />

          <Typography>
            <span style={spanStyles}>ID:</span> {userData.userId}
          </Typography>
          <Typography>
            <span style={spanStyles}>Token:</span> {userData.accessToken}
          </Typography>
        </>
      </UserCardWrapper>
      <UserCardWrapper>
        <StatisticPostsAndLikes userId={userData.userId} />
      </UserCardWrapper>
    </Box>
  );
};

export default UserPage;
