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
import DothMenu from '../UI/DothMenu';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';
import { fetchLikePost } from 'store/async-actions/posts/likePost';
import { styled } from '@mui/material';
import Comments from 'components/comments/Comments';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PostDothMenu from 'components/posts/PostDothMenu';
import { getDate } from 'helpers/helpers-functions';
import { toast } from 'react-toastify';

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
  color: !expand ? 'greey' : '#1976d2',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = React.forwardRef(
  ({ author, date, text, idPost, authorID, whoLikes }: IPostCard, ref: IRef) => {
    const dateCreated = getDate(date);

    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.AuthorizationSlice);
    const [isLike, setIsLike] = React.useState<boolean>(
      whoLikes.includes(userData ? userData.userId : '')
    );
    const [countLikes, setCountLikes] = React.useState<number>(whoLikes.length);
    const [countComments, setCountComments] = React.useState<number>(0);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

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
        <Comments expanded={expanded} postId={idPost} setCountComments={setCountComments} />
      </Card>
    );
  }
);

export default PostCard;
