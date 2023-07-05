import { Box } from '@mui/material';
import React from 'react';
export const UserCardWrapper = ({ children }: { children?: JSX.Element }) => {
  return (
    <Box
      sx={{
        wordBreak: 'break-word',
        width: '100%',
        backgroundColor: 'white',
        p: 3,
        borderRadius: '8px',
      }}
    >
      {children}
    </Box>
  );
};
