import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { useState } from 'react';
import { fetchLikeComment } from 'helpers/fetch/comments-requests/likeComment';
import CommentDothMenu from './CommentDothMenu';
import DothMenu from 'components/UI/DothMenu';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';

interface IPostCard {
  author: string;
  date: string;
  text: string;
  commentId: string;
  authorID: string;
  whoLikes: string[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const getDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Number(date));
};

const Comment = ({ author, date, text, commentId, authorID, whoLikes, setComments }: IPostCard) => {
  const dateCreated = getDate(date);
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const [isLike, setIsLike] = useState(whoLikes.includes(userData!.userId));
  const [countLikes, setCountLikes] = useState(whoLikes.length);
  const [commentText, setCommentText] = useState(text);

  const handleLike = async () => {
    try {
      const response = await fetchLikeComment({ commentId, userId: userData!.userId });
      setIsLike(response.whoLikes.includes(userData!.userId));
      setCountLikes(response.whoLikes.length);
    } catch (error) {
      alert('ERROR');
    }
  };
  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        classes={{ content: 'custom-comment-header' }}
        action={
          authorID === userData!.userId ? (
            <DothMenu>
              <CommentDothMenu
                commentId={commentId}
                text={commentText}
                setCommentText={setCommentText}
                setComments={setComments}
              />
            </DothMenu>
          ) : null
        }
        title={dateCreated}
        sx={{ padding: '5px 10px 5px 5px' }}
      />
      <CardContent sx={{ padding: '0px 15px' }}>
        <Typography color="text">{`${author}: ${commentText}`}</Typography>
      </CardContent>
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
    </Card>
  );
};

export default Comment;
