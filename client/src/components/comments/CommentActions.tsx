import { CardActions, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { memo, useState } from 'react';
import { toast } from 'react-toastify';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import CommentsFetch from 'http/fetch/comments-fetch';

interface ICommentActions {
  whoLikes: string[];
  userId: string;
  commentId: string;
}

export const CommentActions = memo(({ whoLikes, userId, commentId }: ICommentActions) => {
  const [isLike, setIsLike] = useState(whoLikes.includes(userId));
  const [countLikes, setCountLikes] = useState(whoLikes.length);

  const handleLike = async () => {
    try {
      const response = (await CommentsFetch.fetchLikeComment({
        commentId,
        userId: userId,
      })) as IComment;
      setIsLike(response.whoLikes.includes(userId));
      setCountLikes(response.whoLikes.length);
    } catch (error) {
      toast('Server error, sory :(');
    }
  };
  return (
    <CardActions>
      <IconButton
        aria-label="add to favorites"
        size="small"
        sx={{ color: isLike ? 'red' : 'greey' }}
        onClick={handleLike}
      >
        <FavoriteIcon />
      </IconButton>
      <Typography>{countLikes}</Typography>
    </CardActions>
  );
});
