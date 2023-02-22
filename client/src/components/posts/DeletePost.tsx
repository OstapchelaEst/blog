import { Typography, Box, Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { fetchDeletePost } from 'store/async-actions/posts/deletePost';
import { useAppDispatch } from 'store/custom-hooks/custom-hooks';

interface IDeletePost {
  idPost: string;
  closeModal?: () => void;
}

const DeletePost = ({ idPost, closeModal }: IDeletePost) => {
  const dispatch = useAppDispatch();
  const handleClick = async () => {
    try {
      await dispatch(fetchDeletePost({ id: idPost })).unwrap();
      if (closeModal) closeModal();
    } catch (error) {
      toast('Somethin went wrong');
      if (closeModal) closeModal();
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 1, color: '#1976d2' }}>
        Are you shure?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: 4 }}>
        <Button variant="outlined" fullWidth onClick={handleClick}>
          Yes
        </Button>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            if (closeModal) closeModal();
          }}
        >
          No
        </Button>
      </Box>
    </>
  );
};

export default DeletePost;
