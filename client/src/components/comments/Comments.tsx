import { Collapse, CardContent, Typography, Button, Box } from '@mui/material';
import CommentsFetch from 'http/fetch/comments-fetch';
import React, { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import Comment from './Comment';
import CreateCommentForm from './CreateCommentForm';

interface IComments {
  expanded: boolean | undefined;
  postId: string;
  setCountComments: Dispatch<SetStateAction<number>>;
}

interface AnimationEvent<T = Element> extends React.SyntheticEvent<T> {
  animationName: string;
  elapsedTime: number;
  pseudoElement: string;
}

const Comments = ({ expanded, postId, setCountComments }: IComments) => {
  console.log('RENDER COMMENTS');
  const [comments, setComments] = useState<IComment[]>([]);
  const [howCommentsShow, setHowCommentsShow] = useState<number>(3);
  const [permission, setPermission] = useState<boolean>(false);

  const countComments = React.useRef<number>(10000000);
  const isFirstRender = React.useRef<boolean>(true);

  const showMoreComments = (previosCount: number = howCommentsShow) => {
    const newCountComments = previosCount + 3;
    setHowCommentsShow(newCountComments);
    if (newCountComments >= comments.length) {
    }
  };

  const animationHandler = (e: AnimationEvent) => {
    if (e.animationName === 'createCommentAnimation') {
      console.log('Удалили разрешение на анимацию после анимации ');
      setPermission(false);
    }
  };

  useEffect(() => {
    console.log('Произошло обновление количества комментариев');
    if (!isFirstRender.current) {
      if (countComments.current < comments.length) {
        console.log('Комментариев стало больше');
        countComments.current = comments.length;
        setPermission(true);
      } else {
        console.log('Комментариев столько же или меньше');
        countComments.current = comments.length;
      }
    } else {
      isFirstRender.current = false;
    }
  }, [comments]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const commenst = (await CommentsFetch.fetchGetcCommentsToPost({ postId })) as IComment[];
        setComments(commenst);
        setCountComments(commenst.length);
      } catch (error) {
        toast('Server error, sory :(');
      }
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
      <CardContent
        onAnimationEnd={animationHandler}
        className={`comments-list ${permission ? 'allow' : ''}`}
      >
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
                  setCountComments={setCountComments}
                  setHowCommentsShow={setHowCommentsShow}
                />
              );
            }
          })
        ) : (
          <Typography sx={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.6)', mb: 2 }}>
            {`As long as it's empty`}
          </Typography>
        )}
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        {howCommentsShow < comments.length && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              showMoreComments(howCommentsShow);
            }}
            sx={{ mb: 2 }}
          >
            Show more
          </Button>
        )}

        <CreateCommentForm
          postId={postId}
          setComments={setComments}
          setHowCommentsShow={setHowCommentsShow}
          allCommentsLength={comments.length}
          setCountComments={setCountComments}
        />
      </Box>
    </Collapse>
  );
};

export default memo(Comments);
