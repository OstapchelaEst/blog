import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DothMenu from './DothMenu';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { fetchLikePost } from 'store/async-actions/posts/likePost';
import { styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostDothMenu from 'components/PostDothMenu';
import Comments from 'components/comments/Comments';

interface IPostCard {
  author: string;
  date: string;
  text: string;
  idPost: string;
  authorID: string;
  whoLikes: string[];
}

type IRef =
  | ((instance: HTMLDivElement | null) => void)
  | React.RefObject<HTMLDivElement>
  | null
  | undefined;

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const getDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Number(date));
};

const PostCard = React.forwardRef(
  ({ author, date, text, idPost, authorID, whoLikes }: IPostCard, ref: IRef) => {
    const dateCreated = getDate(date);

    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.AuthorizationSlice);
    const [isLike, setIsLike] = React.useState(whoLikes.includes(userData!.userId));
    const [countLikes, setCountLikes] = React.useState(whoLikes.length);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    const handleLike = async () => {
      try {
        const response = await dispatch(fetchLikePost({ id: idPost, idUser: userData!.userId }));
        setIsLike((response.payload as string[]).includes(userData!.userId));
        setCountLikes((response.payload as string[]).length);
      } catch (error) {}
    };

    return (
      <Card ref={ref} sx={{ maxWidth: '70%', margin: '0 auto 30px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {author[0].toUpperCase()}
            </Avatar>
          }
          action={
            <DothMenu>
              <PostDothMenu idPost={idPost} authorID={authorID} text={text} />
            </DothMenu>
          }
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
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Comments expanded={expanded} postId={idPost} />
      </Card>
    );
  }
);

export default PostCard;
