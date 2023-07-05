import { CSSObject } from '@emotion/react';
import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';

const spanStyles = {
  fontWeight: 900,
  color: '#1976d2 ',
};

export const UserLoginAndEmail = ({
  login,
  email,
  avatarSettings,
  withAvatar = false,
}: {
  login: string;
  email: string;
  avatarSettings?: CSSObject;
  withAvatar?: boolean;
}) => {
  return (
    <Box sx={{ display: 'flex', columnGap: 3, alignItems: 'center' }}>
      {withAvatar && <Avatar sx={avatarSettings ? avatarSettings : {}}>{login[0]}</Avatar>}
      <Box>
        <Typography sx={{ mb: 1 }}>
          <span style={spanStyles}>Login:</span> {login}
        </Typography>
        <Typography>
          <span style={spanStyles}>Email:</span> {email}
        </Typography>
      </Box>
    </Box>
  );
};
