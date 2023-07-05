import React from 'react';
import { Divider, List } from '@mui/material';
import { MenuActions } from './MenuActions';
import { MenuNavigation } from './MenuNavigation';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';

export const Menu = ({ open }: { open: boolean }) => {
  const isAuth = useAppSelector((state) => state.AuthorizationSlice.isAuth);
  return (
    <>
      <Divider />
      <List>{<MenuNavigation isAuth={isAuth} open={open} />}</List>
      <Divider />
      <List>{<MenuActions isAuth={isAuth} open={open} />}</List>
    </>
  );
};
