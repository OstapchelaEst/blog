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

const getDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(Number(date));
};

const boxSettings = {
  mb: 2,
  transition: 'all 0.4s ease 0s',
  overflowe: 'hidden',
  position: 'relative',
};

const cardSettings = {
  transition: 'all 0.4s ease 0s',
  top: '0',
  left: '0%',
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
  const boxRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const dateCreated = getDate(date);
  const userId = useAppSelector((state) => state.AuthorizationSlice.userData!.userId);
  const [commentText, setCommentText] = useState(text);

  const deleteCardAnimation = () => {
    const card = cardRef.current as HTMLDivElement;
    card.style.position = 'absolute';
    card.style.left = '-100%';
  };

  const hideTheCard = () => {
    const box = boxRef.current as HTMLDivElement;
    box.style.height = '0px';
    box.style.marginBottom = '0px';
  };

  useLayoutEffect(() => {
    const commentBlock = boxRef.current as HTMLDivElement;
    commentBlock.style.height = commentBlock.clientHeight + 'px';
  }, []);

  return (
    <Box
      ref={boxRef as React.RefObject<HTMLDivElement>}
      onTransitionEnd={(e) => {
        if (e.target !== cardRef.current) return null;
        hideTheCard();
      }}
      sx={boxSettings}
    >
      <Card ref={cardRef as React.RefObject<HTMLDivElement>} sx={cardSettings}>
        <CardHeader
          classes={{ content: 'custom-comment-header' }}
          action={
            authorID === userId ? (
              <DothMenu>
                <CommentDothMenu
                  commentId={commentId}
                  text={commentText}
                  setCommentText={setCommentText}
                  setComments={setComments}
                  setCountComments={setCountComments}
                  deleteCardAnimation={deleteCardAnimation}
                />
              </DothMenu>
            ) : null
          }
          title={dateCreated}
          sx={{ padding: '5px 10px 5px 5px' }}
        />
        <button onClick={deleteCardAnimation}>SYKA</button>
        <CardContent sx={{ padding: '0px 15px' }}>
          <Typography color="text">{`${author}: ${commentText}`}</Typography>
        </CardContent>
        <CommentActions whoLikes={whoLikes} userId={userId} commentId={commentId} />
      </Card>
    </Box>
  );
};

export default React.memo(Comment);
