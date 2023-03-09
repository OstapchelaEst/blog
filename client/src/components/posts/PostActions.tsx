import { CardActions, IconButton, IconButtonProps, styled, Typography } from '@mui/material';
import React, { Dispatch, memo, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchLikePost } from 'store/async-actions/posts/likePost';
import { useAppSelector, useAppDispatch } from 'store/custom-hooks/custom-hooks';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: !expand ? 'greey' : '#1976d2',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IPostActions {
  whoLikes: string[];
  idPost: string;
  countComments: number;
  expanded: boolean;
  handleExpandClick: () => void;
}

const PostActions = ({
  whoLikes,
  idPost,
  countComments,
  expanded,
  handleExpandClick,
}: IPostActions) => {
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const dispatch = useAppDispatch();

  const [isLike, setIsLike] = useState<boolean>(whoLikes.includes(userData ? userData.userId : ''));
  const [countLikes, setCountLikes] = useState<number>(whoLikes.length);

  const handleLike = async () => {
    try {
      const response = await dispatch(
        fetchLikePost({ id: idPost, idUser: userData!.userId })
      ).unwrap();
      setIsLike(response.includes(userData!.userId));
      setCountLikes(response.length);
    } catch (error) {
      toast('Somthing went wrong');
    }
  };
  return (
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <IconButton
        aria-label="add to favorites"
        sx={{ color: isLike ? 'red' : 'greey' }}
        onClick={handleLike}
      >
        <FavoriteIcon />
      </IconButton>
      <Typography>{countLikes}</Typography>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="comments"
        sx={{ justifySelf: 'end' }}
      >
        <InsertCommentIcon />
      </ExpandMore>
      <Typography sx={{ pr: 2 }}>{countComments}</Typography>
    </CardActions>
  );
};

export default memo(PostActions);
