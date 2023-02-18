import { Typography, Box, Button } from '@mui/material';
import { fetchDeleteComment } from 'helpers/fetch/comments-requests/deleteComment';
import React from 'react';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';

interface IDeletePost {
  commentId: string;
  closeModal?: () => void;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const DeleteComment = ({ commentId, closeModal, setComments }: IDeletePost) => {
  const handleClick = async () => {
    const response = await fetchDeleteComment({ commentId });
    console.log(response);
    setComments((prev) => {
      return prev.filter((comment) => {
        if (comment._id !== response._id) return comment;
      });
    });
    if (closeModal) closeModal();
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
