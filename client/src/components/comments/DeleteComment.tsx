import { Typography, Box, Button } from '@mui/material';
import CommentsFetch from 'http/fetch/comments-fetch';
import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';

interface IDeletePost {
  commentId: string;
  closeModal?: () => void;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setCountComments: Dispatch<SetStateAction<number>>;
  deleteCardAnimation: () => void;
}

const DeleteComment = ({
  commentId,
  closeModal,
  setComments,
  setCountComments,
  deleteCardAnimation,
}: IDeletePost) => {
  const handleClick = async () => {
    try {
      const response = (await CommentsFetch.fetchDeleteComment({ commentId })) as IComment;
      deleteCardAnimation();
      setComments((prev) => {
        return prev.filter((comment) => {
          if (comment._id !== response._id) return comment;
        });
      });
      setCountComments((prev) => prev - 1);
      if (closeModal) closeModal();
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
