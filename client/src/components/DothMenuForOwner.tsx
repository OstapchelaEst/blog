import React from 'react';
import DeletePost from './DeletePost';
import TransitionsModal from './ModalWindow';
import UpdatePostText from './updatePostText';
const DothMenuForOwner = ({ idPost, text }: { idPost: string; text: string }) => {
  return (
    <div>
      <TransitionsModal buttonText={'Delete post'} stylesButton={{ ml: 1 }}>
        <DeletePost idPost={idPost} />
      </TransitionsModal>
      <TransitionsModal buttonText={'Update post'} stylesButton={{ ml: 1 }}>
        <UpdatePostText idPost={idPost} text={text} />
      </TransitionsModal>
    </div>
  );
};

export default DothMenuForOwner;
