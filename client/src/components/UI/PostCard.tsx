import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DothMenu from './DothMenu';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { fetchLikePost } from 'store/async-actions/posts/likePost';

interface IPostCard {
  author: string;
  date: string;
  text: string;
  idPost: string;
  authorID: string;
  whoLikes: string[];
}

export default function PostCard({ author, date, text, idPost, authorID, whoLikes }: IPostCard) {
  const dateCreated = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Number(date));

  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const [isLike, setIsLike] = React.useState(whoLikes.includes(userData!.userId));
  const [countLikes, setCountLikes] = React.useState(whoLikes.length);

  const handleLike = async () => {
    try {
      const response = await dispatch(fetchLikePost({ id: idPost, idUser: userData!.userId }));
      setIsLike((response.payload as string[]).includes(userData!.userId));
      setCountLikes((response.payload as string[]).length);
    } catch (error) {}
  };
  return (
    <Card sx={{ maxWidth: '70%', margin: '0 auto 30px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {author[0].toUpperCase()}
          </Avatar>
        }
        action={<DothMenu idPost={idPost} authorID={authorID} text={text} />}
        title={author}
        subheader={dateCreated}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="add to favorites"
          sx={{ color: isLike ? 'red' : 'greey' }}
          onClick={handleLike}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography>{countLikes}</Typography>
      </CardActions>
    </Card>
  );
}
