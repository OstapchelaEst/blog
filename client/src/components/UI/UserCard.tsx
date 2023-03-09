import { Avatar, Card, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';

interface IUserCard {
  name: string;
  email: string;
}

const UserCard = ({ name, email }: IUserCard) => {
  return (
    <Card sx={{ p: 2, mb: 2, display: 'flex', columnGap: 2 }}>
      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        {name[0]}
      </Avatar>
      <Box>
        <Typography>{name}</Typography>
        <Typography>{email}</Typography>
      </Box>
    </Card>
  );
};

export default UserCard;
