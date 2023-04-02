import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';
import CommentDothMenu from './CommentDothMenu';
import DothMenu from 'components/UI/DothMenu';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import { CommentActions } from './CommentActions';
import { Box } from '@mui/material';

import '../../styles/animation.scss';

interface IPostCard {
  author: string;
  date: string;
  text: string;
  commentId: string;
  authorID: string;
  whoLikes: string[];
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setCountComments: Dispatch<SetStateAction<number>>;
}

interface AnimationEvent<T = Element> extends React.SyntheticEvent<T> {
  animationName: string;
  elapsedTime: number;
  pseudoElement: string;
}

const getDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Number(date));
};

const cardSettings = {
  mb: 2,
};

const Comment = ({
  author,
  date,
  text,
  commentId,
  authorID,
  whoLikes,
  setComments,
  setCountComments,
}: IPostCard) => {
  console.log('render');
  const cardRef = React.useRef<HTMLDivElement>(null);

  const dateCreated = getDate(date);
  const userId = useAppSelector((state) => state.AuthorizationSlice.userData!.userId);
  const [commentText, setCommentText] = useState(text);

  useLayoutEffect(() => {
    const cardRefBlock = cardRef.current as HTMLDivElement;
    cardRefBlock.style.height = cardRefBlock.clientHeight + 'px';
  }, []);

  const deleteCommentAnimation = () => {
    const card = cardRef.current as HTMLDivElement;
    card.classList.add('deleteComment');
  };

  const deleteComment = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.animationName === 'moveToLeftAnimation') {
      setCountComments((prev) => --prev);
      setComments((prev) => {
        return prev.filter((comment) => {
          if (comment._id !== commentId) return comment;
        });
      });
    }
  };

  return (
    <Card
      ref={cardRef as React.RefObject<HTMLDivElement>}
      sx={cardSettings}
      onAnimationEnd={deleteComment}
    >
      <CardHeader
        classes={{ content: 'custom-comment-header' }}
        action={
          authorID === userId ? (
            <DothMenu>
              <CommentDothMenu
                commentId={commentId}
                text={commentText}
                setCommentText={setCommentText}
                deleteCommentAnimation={deleteCommentAnimation}
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
      <CommentActions whoLikes={whoLikes} userId={userId} commentId={commentId} />
    </Card>
  );
};

export default React.memo(Comment);
