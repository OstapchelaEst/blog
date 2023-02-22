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
  setCountComments,
}: {
  commentId: string;
  text: string;
  setCommentText: Dispatch<SetStateAction<string>>;
  setComments: Dispatch<SetStateAction<IComment[]>>;
  setCountComments: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <TransitionsModal buttonText={'Change text'}>
        <ChangeCommentTextForm commentId={commentId} text={text} setCommentText={setCommentText} />
      </TransitionsModal>
      <TransitionsModal buttonText={'Delete comment'}>
        <DeleteComment
          commentId={commentId}
          setComments={setComments}
          setCountComments={setCountComments}
        />
      </TransitionsModal>
    </>
  );
};

export default CommentDothMenu;
