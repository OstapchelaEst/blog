import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { ROUTHES } from '../../constants/constants';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ArticleIcon from '@mui/icons-material/Article';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { fetchLogout } from 'store/async-actions/authorization/logout';
import TransitionsModal from 'components/ModalWindow';
import CreatePostForm from 'components/posts/CreatePostForm';
import GroupsIcon from '@mui/icons-material/Groups';
import { ToastContainer } from 'react-toastify';
import {
  SearchIconWrapper,
  StyledInputBase,
  DrawerHeader,
  Search,
  AppBar,
  Drawer,
} from 'helpers/drawer-functions';

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isAuth = useAppSelector((state) => state.AuthorizationSlice.isAuth);
  const dispatch = useAppDispatch();

  const logout = async () => {
    navigate('/authorization');
    dispatch(fetchLogout());
  };

  const navDataIfUserAuth = [
    {
      text: 'Home page',
      routh: ROUTHES.HOME_PAGE,
      icon: <HomeIcon />,
    },
    {
      text: 'Profile',
      routh: ROUTHES.USER,
      icon: <AccountCircleIcon />,
    },
    {
      text: 'Posts',
      routh: ROUTHES.POSTS,
      icon: <ArticleIcon />,
    },
    {
      text: 'Customers',
      routh: ROUTHES.USERS,
      icon: <GroupsIcon />,
    },
  ];
  const navDataIfUserIsNotAuth = [
    {
      text: 'Home page',
      routh: ROUTHES.HOME_PAGE,
      icon: <HomeIcon />,
    },
  ];

  const navActionsDataIfUserIsNotAuth = [
    {
      text: 'Sign in',
      routh: ROUTHES.AUTHORIZATION,
      icon: <LockOpenIcon />,
    },
    {
      text: 'Sign up',
      routh: ROUTHES.REGISTRATION,
      icon: <FollowTheSignsIcon />,
    },
  ];

  const navActionsDataIfUserAuth = [
    {
      text: 'Logout',
      routh: ROUTHES.HOME_PAGE,
      icon: <LogoutIcon />,
      onClickFN: logout,
    },
  ];

  const generateNavItems = (data: { text: string; routh: string; icon: JSX.Element }[]) => {
    return data.map((data) => (
      <NavLink key={data.text} to={data.routh}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {data.icon}
            </ListItemIcon>

            <ListItemText primary={data.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    ));
  };

  const generateNavActionsItems = (
    data: { text: string; routh: string; icon: JSX.Element; onClickFN?: () => void }[]
  ) => {
    return data.map((data) => (
      <ListItem key={data.text} disablePadding sx={{ display: 'block' }}>
        <NavLink to={data.routh}>
          <ListItemButton
            onClick={data?.onClickFN}
            sx={{
              minHeight: 53,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {data.icon}
            </ListItemIcon>

            <Button
              fullWidth={true}
              variant="contained"
              sx={{ opacity: open ? 1 : 0, display: open ? 'block' : 'none' }}
            >
              {data.text}
            </Button>
          </ListItemButton>
        </NavLink>
      </ListItem>
    ));
  };

  const renderNavigationMenu = () => {
    if (isAuth) {
      return generateNavItems(navDataIfUserAuth);
    } else {
      return generateNavItems(navDataIfUserIsNotAuth);
    }
  };
  const renderActionsMenu = () => {
    if (isAuth) {
      return generateNavActionsItems(navActionsDataIfUserAuth);
    } else {
      return generateNavActionsItems(navActionsDataIfUserIsNotAuth);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
            Mini blog
          </Typography>
          <TransitionsModal buttonText={'Create post'} stylesButton={{ color: 'white' }}>
            <CreatePostForm />
          </TransitionsModal>
          <Search sx={{ justifySelf: 'flex-end' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>{renderNavigationMenu()}</List>
        <Divider />
        <List>{renderActionsMenu()}</List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          p: 3,
          backgroundColor: '#ebedf0',
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
