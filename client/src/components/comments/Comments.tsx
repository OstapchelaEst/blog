import { Collapse, CardContent, Typography, Button } from '@mui/material';
import { fetchGetcCommentsToPost } from 'helpers/fetch/comments-requests/getCommentsToPost';
import React, { useEffect, useState } from 'react';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import Comment from './Comment';
import CreateCommentForm from './CreateCommentForm';

const Comments = ({ expanded, postId }: { expanded: boolean | undefined; postId: string }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [howCommentsShow, setHowCommentsShow] = useState<number>(3);

  const showMoreComments = () => {
    setHowCommentsShow((prev) => prev + 3);
  };

  useEffect(() => {
    const getComments = async () => {
      const commenst = await fetchGetcCommentsToPost(postId);
      setComments(commenst as IComment[]);
    };
    getComments();
  }, []);

  useEffect(() => {
    if (!expanded) {
      setHowCommentsShow(3);
    }
  }, [expanded]);

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        {comments.length ? (
          comments.map((comment, index) => {
            if (index < howCommentsShow) {
              return (
                <Comment
                  key={comment._id}
                  author={comment.authorLogin}
                  date={comment.datePublish}
                  text={comment.text}
                  commentId={comment._id}
                  authorID={comment.authorId}
                  whoLikes={comment.whoLikes}
                  setComments={setComments}
                />
              );
            }
          })
        ) : (
          <Typography sx={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
            {`As long as it's empty`}
          </Typography>
        )}
        {howCommentsShow < comments.length && (
          <Button variant="outlined" fullWidth onClick={showMoreComments} sx={{ mb: 2 }}>
            Show more
          </Button>
        )}
        <CreateCommentForm
          postId={postId}
          setComments={setComments}
          setHowCommentsShow={setHowCommentsShow}
          allCommentsLength={comments.length}
        />
      </CardContent>
    </Collapse>
  );
};

export default Comments;
