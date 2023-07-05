import { Card } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import { StatisticPostsAndLikes } from 'components/statistics/StatisticPostsAndLikes';
import { UserLoginAndEmail } from './UserLoginAndEmail';

interface IUserCard {
  name: string;
  email: string;
  userId: string;
}

const UserCard = ({ name, email, userId }: IUserCard) => {
  return (
    <Card
      sx={{
        justifySelf: 'flex-start',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        minWidth: '360px',
      }}
    >
      <UserLoginAndEmail login={name} email={email} avatarSettings={{ bgcolor: red[500] }} />
      <StatisticPostsAndLikes userId={userId} />
    </Card>
  );
};

export default UserCard;
