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
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap="2rem">
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
