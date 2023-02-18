import { MenuItem } from '@mui/material';
import React, { useCallback } from 'react';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { useAppSelector, useAppDispatch } from 'store/custom-hooks/custom-hooks';
import DothMenuForOwner from './DothMenuForOwner';

const PostDothMenu = ({
  idPost,
  handleClose,
  authorID,
  text,
}: {
  idPost: string;
  authorID: string;
  text: string;
  handleClose?: () => void;
}) => {
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const dispatch = useAppDispatch();

  const setIgnorePost = useCallback(() => {
    dispatch(fetchIgnorePost({ id: idPost, idUser: userData!.userId }));
  }, [dispatch, idPost, userData]);

  return (
    <>
      <MenuItem
        key={'Ignore all this user posts'}
        onClick={() => {
          if (handleClose) handleClose();
        }}
      >
        {'Ignore all this user posts'}
      </MenuItem>
      <MenuItem
        key={'Ignore post'}
        onClick={() => {
          if (handleClose) handleClose();
          setIgnorePost();
        }}
      >
        {'Ignore post'}
      </MenuItem>
      {authorID === userData!.userId && <DothMenuForOwner idPost={idPost} text={text} />}
    </>
  );
};

export default PostDothMenu;
