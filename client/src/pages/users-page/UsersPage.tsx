import { Box } from '@mui/material';
import UserCard from 'components/user-card/UserCard';
import { getAllUserFetch } from 'http/fetch/get-all-users-fetch';
import React, { useEffect, useState } from 'react';
import { IUserData } from 'store/slices/interfaces/authorization-slice-interfaces';

const UsersPage = () => {
  const [users, setUsers] = useState<IUserData[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUserFetch();
        setUsers(users as IUserData[]);
      } catch (error) {
        setUsers([]);
      }
    };
    getUsers();
  }, []);
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2,0.5fr)',
        '@media (max-width: 800px)': { gridTemplateColumns: 'repeat(1,1fr)' },
        justifyContent: 'center',
        gap: 2,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {users.map((user) => {
        return (
          <UserCard
            key={user.userId + user.email}
            name={user.login}
            email={user.email}
            userId={user._id}
          />
        );
      })}
    </Box>
  );
};

export default UsersPage;
