import TransitionsModal from 'components/ModalWindow';
import React, { Dispatch, SetStateAction } from 'react';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import ChangeCommentTextForm from './ChangeCommentTextForm';
import DeleteComment from './DeleteComment';

const CommentDothMenu = ({
  commentId,
  text,
  setCommentText,
  setComments,
}: {
  commentId: string;
  text: string;
  setCommentText: Dispatch<SetStateAction<string>>;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}) => {
  return (
    <>
      <TransitionsModal buttonText={'Change text'}>
        <ChangeCommentTextForm commentId={commentId} text={text} setCommentText={setCommentText} />
      </TransitionsModal>
      <TransitionsModal buttonText={'Delete comment'}>
        <DeleteComment commentId={commentId} setComments={setComments} />
      </TransitionsModal>
    </>
  );
};

export default CommentDothMenu;
