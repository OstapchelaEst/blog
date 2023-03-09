import * as React from 'react';
import Comments from 'components/comments/Comments';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { useState } from 'react';
import PostActions from './PostActions';
import Card from '@mui/material/Card';

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

const PostCard = React.forwardRef(
  ({ author, date, text, idPost, authorID, whoLikes }: IPostCard, ref: IRef) => {
    const [countComments, setCountComments] = useState<number>(0);

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
      <Card ref={ref} sx={{ maxWidth: '70%', margin: '0 auto 30px' }}>
        <PostHeader author={author} idPost={idPost} authorID={authorID} text={text} date={date} />
        <PostContent text={text} />
        <PostActions
          whoLikes={whoLikes}
          idPost={idPost}
          countComments={countComments}
          expanded={expanded}
          handleExpandClick={handleExpandClick}
        />
        <Comments expanded={expanded} postId={idPost} setCountComments={setCountComments} />
      </Card>
    );
  }
);

export default PostCard;
