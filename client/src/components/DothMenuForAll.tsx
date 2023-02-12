import { MenuItem } from '@mui/material';
import React, { useCallback } from 'react';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';

interface IDothMenuForAll {
  idPost: string;
  handleClose: () => void;
}

const DothMenuForAll = ({ idPost, handleClose }: IDothMenuForAll) => {
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
          handleClose();
        }}
      >
        {'Ignore all this user posts'}
      </MenuItem>
      <MenuItem
        key={'Ignore post'}
        onClick={() => {
          handleClose();
          setIgnorePost();
        }}
      >
        {'Ignore post'}
      </MenuItem>
    </>
  );
};

export default DothMenuForAll;
