import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import { NavigationElement } from 'containers/NavigationElement/NavigationElement';
import { ROUTES } from 'constants/constants';

const navDataIfUserAuth = [
  {
    text: 'Home page',
    route: ROUTES.HOME_PAGE,
    icon: <HomeIcon />,
    type: 'text' as const,
  },
  {
    text: 'Profile',
    route: ROUTES.USER,
    icon: <AccountCircleIcon />,
    type: 'text' as const,
  },
  {
    text: 'Posts',
    route: ROUTES.POSTS,
    icon: <ArticleIcon />,
    type: 'text' as const,
  },
  {
    text: 'Customers',
    route: ROUTES.USERS,
    icon: <GroupsIcon />,
    type: 'text' as const,
  },
];

const navDataIfUserIsNotAuth = [
  {
    text: 'Home page',
    route: ROUTES.HOME_PAGE,
    icon: <HomeIcon />,
    type: 'text' as const,
  },
];

export const MenuNavigation = ({ isAuth, open }: { isAuth: boolean; open: boolean }) => {
  if (isAuth) {
    return (
      <>
        {navDataIfUserAuth.map((data) => (
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
  }

  return (
    <>
      {navDataIfUserIsNotAuth.map((data) => (
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
