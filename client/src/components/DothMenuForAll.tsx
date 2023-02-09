import { MenuItem } from '@mui/material';
import React from 'react';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { useAppDispatch, useAppSelector } from 'store/custom-hooks/custom-hooks';

const DothMenuForAll = ({ idPost, handleClose }: { idPost: string; handleClose: () => void }) => {
  const { userData } = useAppSelector((state) => state.AuthorizationSlice);
  const dispatch = useAppDispatch();
  const setIgnorePost = () => {
    dispatch(fetchIgnorePost({ id: idPost, idUser: userData!.userId }));
  };
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