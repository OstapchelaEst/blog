import { Skeleton, Typography } from '@mui/material';
import React from 'react';

export const contentOrSkeleton = (
  isLoading: boolean,
  value: string | number,
  width: string | number = '75%',
  height: string | number = 25
): JSX.Element => {
  return isLoading ? (
    <Skeleton animation="wave" height={height} width={width} />
  ) : (
    <Typography>{value}</Typography>
  );
};
