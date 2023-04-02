import { Typography, Box, Button } from '@mui/material';
import CommentsFetch from 'http/fetch/comments-fetch';
import React from 'react';
import { toast } from 'react-toastify';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';

interface IDeletePost {
  commentId: string;
  closeModal?: () => void;
  deleteCommentAnimation: () => void;
}

const DeleteComment = ({ commentId, closeModal, deleteCommentAnimation }: IDeletePost) => {
  const handleClick = async () => {
    try {
      (await CommentsFetch.fetchDeleteComment({ commentId })) as IComment;
      if (closeModal) closeModal();
      deleteCommentAnimation();
    } catch (error) {
      toast('Server error, sory :(');
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

export default DeleteComment;
