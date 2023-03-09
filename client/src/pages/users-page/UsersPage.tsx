import UserCard from 'components/UI/UserCard';
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
        console.log(users);
      } catch (error) {
        setUsers([]);
      }
    };

    getUsers();
  }, []);
  return (
    <>
      {users.map((user) => {
        return <UserCard key={user.userId} name={user.login} email={user.email} />;
      })}
    </>
  );
};

export default UsersPage;
