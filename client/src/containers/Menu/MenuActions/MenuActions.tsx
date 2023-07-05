import React from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavigationElement } from 'containers/NavigationElement';
import { ROUTES } from 'constants/constants';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';
import { useNavigate } from 'react-router';
import { fetchLogout } from 'store/async-actions/authorization/logout';
import { NavigationItem } from 'components/NavigationItem';

const MenuActionsUserIsNotAuth = [
  {
    text: 'Sign in',
    route: ROUTES.AUTHORIZATION,
    icon: <LockOpenIcon />,
    type: 'button' as const,
  },
  {
    text: 'Sign up',
    route: ROUTES.REGISTRATION,
    icon: <FollowTheSignsIcon />,
    type: 'button' as const,
  },
];

export const MenuActions = ({ isAuth, open }: { isAuth: boolean; open: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    navigate('/authorization');
    dispatch(fetchLogout());
  };

  if (isAuth) {
    return (
      <NavigationItem
        icon={<LogoutIcon />}
        open={open}
        route={ROUTES.HOME_PAGE}
        text={'Logout'}
        type={'button'}
        onClick={logout}
        isActive={false}
      />
    );
  }
  return (
    <>
      {MenuActionsUserIsNotAuth.map((data) => (
        <NavigationElement
          key={data.route}
          icon={data.icon}
          open={open}
          route={data.route}
          text={data.text}
          type={data.type}
        />
      ))}
    </>
  );
};
