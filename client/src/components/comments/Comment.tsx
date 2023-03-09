import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useAppSelector } from 'store/custom-hooks/custom-hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import CommentDothMenu from './CommentDothMenu';
import DothMenu from 'components/UI/DothMenu';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import { CommentActions } from './CommentActions';

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
  const dateCreated = getDate(date);
  const userId = useAppSelector((state) => state.AuthorizationSlice.userData!.userId);

  const [commentText, setCommentText] = useState(text);

  return (
    <Card sx={{ mb: 2 }}>
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
