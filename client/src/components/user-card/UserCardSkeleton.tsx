import { Card, Box, Skeleton } from '@mui/material';
import React from 'react';
export const UserCardSekeleton = () => {
  return (
    <Card sx={{ p: 2, mb: 2, display: 'flex', columnGap: 2 }}>
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <Box width="100%">
        <Skeleton animation="wave" height={25} width="50%" style={{ marginBottom: 2 }} />
        <Skeleton animation="wave" height={25} width="70%" />
        <Skeleton animation="wave" height={25} width="30%" />
      </Box>
    </Card>
  );
};
