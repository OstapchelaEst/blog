import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

export interface INavigationItem {
  icon: ReactJSXElement;
  isActive: boolean;
  open: boolean;
  route: string;
  text: string;
  onClick?: () => void;
  type: 'button' | 'text';
}

export const NavigationItem = ({
  icon,
  isActive,
  open,
  route,
  text,
  onClick,
  type,
}: INavigationItem) => {
  return (
    <NavLink to={route}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            backgroundColor: isActive ? 'rgb(52, 152, 219,0.5)' : 'transparent',
            ':hover': {
              backgroundColor:
                type !== 'button'
                  ? 'rgb(52, 152, 219)'
                  : type === 'button' && open
                  ? 'transparent'
                  : 'rgb(52, 152, 219)',
            },
            transition: ' all 0.3s ease 0s',
          }}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          {type === 'text' && <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />}
          {type === 'button' && (
            <Button
              fullWidth={true}
              variant="contained"
              sx={{ opacity: open ? 1 : 0, display: open ? 'block' : 'none' }}
            >
              {text}
            </Button>
          )}
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};
