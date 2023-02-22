import { MenuItem } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { fetchIgnorePost } from 'store/async-actions/posts/ignorePost';
import { useAppSelector, useAppDispatch } from 'store/custom-hooks/custom-hooks';
import DothMenuForOwner from './DothMenuForOwner';

interface IPostDothMenu {
  idPost: string;
  authorID: string;
  text: string;
  handleClose?: () => void;
}
const PostDothMenu = ({ idPost, handleClose, authorID, text }: IPostDothMenu) => {
  const userData = useAppSelector((state) => state.AuthorizationSlice.userData);
  const dispatch = useAppDispatch();

  const setIgnorePost = async () => {
    try {
      await dispatch(fetchIgnorePost({ id: idPost, idUser: userData!.userId })).unwrap();
    } catch (error) {
      toast('Somthing went wrong...');
    }
  };

  return (
    <>
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
