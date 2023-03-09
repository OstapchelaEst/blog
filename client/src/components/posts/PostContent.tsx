import { CardContent, Typography } from '@mui/material';
import React, { memo } from 'react';

const PostContent = ({ text }: { text: string }) => {
  return (
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </CardContent>
  );
};

export default memo(PostContent);
