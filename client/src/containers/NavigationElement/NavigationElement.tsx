import { INavigationItem, NavigationItem } from 'components/NavigationItem/NavigationItem';
import React from 'react';
import { useLocation } from 'react-router';

export const NavigationElement = (props: Omit<INavigationItem, 'isActive'>) => {
  const location = useLocation();
  const pathname = location.pathname;
  return <NavigationItem {...props} isActive={pathname === props.route} />;
};
