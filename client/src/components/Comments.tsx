import { Collapse, CardContent, Typography } from '@mui/material';
import React from 'react';
const Comments = ({ expanded }: { expanded: boolean | undefined }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Comment:</Typography>
      </CardContent>
    </Collapse>
  );
};

export default Comments;
