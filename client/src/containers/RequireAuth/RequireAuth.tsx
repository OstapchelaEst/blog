import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { authorization } from 'utils/navigationMap';

export const RequireAuth = ({ children }: { children: ReactJSXElement }): ReactJSXElement => {
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.AuthorizationSlice.isAuth);
  if (!isAuth) {
    return <Navigate replace state={{ from: location }} to={authorization()} />;
  }
  return children;
};
