import TransitionsModal from 'components/ModalWindow';
import UpdatePostText from 'components/posts/UpdatePostText';
import React from 'react';
import DeletePost from './DeletePost';

interface IDothMenuForOwner {
  idPost: string;
  text: string;
}

const DothMenuForOwner = ({ idPost, text }: IDothMenuForOwner) => {
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
