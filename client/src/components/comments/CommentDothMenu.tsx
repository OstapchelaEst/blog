import TransitionsModal from 'components/ModalWindow';
import React, { Dispatch, memo, SetStateAction } from 'react';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import ChangeCommentTextForm from './ChangeCommentTextForm';
import DeleteComment from './DeleteComment';

const CommentDothMenu = ({
  commentId,
  text,
  setCommentText,

  deleteCommentAnimation,
}: {
  commentId: string;
  text: string;
  setCommentText: Dispatch<SetStateAction<string>>;

  deleteCommentAnimation: () => void;
}) => {
  return (
    <>
      <TransitionsModal buttonText={'Change text'}>
        <ChangeCommentTextForm commentId={commentId} text={text} setCommentText={setCommentText} />
      </TransitionsModal>
      <TransitionsModal buttonText={'Delete comment'}>
        <DeleteComment commentId={commentId} deleteCommentAnimation={deleteCommentAnimation} />
      </TransitionsModal>
    </>
  );
};

export default memo(CommentDothMenu);
