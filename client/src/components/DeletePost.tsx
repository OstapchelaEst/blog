import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { fetchDeletePost } from 'store/async-actions/posts/deletePost';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';
const DeletePost = ({ idPost, handleClose }: { idPost: string; handleClose?: () => void }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 1, color: '#1976d2' }}>
        Are you shure?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={async () => {
            await dispatch(fetchDeletePost({ id: idPost }));
            if (handleClose) handleClose();
          }}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            if (handleClose) handleClose();
          }}
        >
          No
        </Button>
      </Box>
    </>
  );
};

export default DeletePost;
