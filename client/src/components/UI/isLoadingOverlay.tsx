import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
const Loding = () => {
  const { isLoading } = useAppSelector((state) => state.LoadingSlice);
  const content = isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <CircularProgress size={100} color="primary" />
    </Box>
  ) : (
    <></>
  );

  return content;
};

export default Loding;
