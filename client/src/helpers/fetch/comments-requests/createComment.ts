import $api from '../../../http/index';

interface IFetchCreateComment {
  authorLogin: string;
  authorId: string;
  postId: string;
  text: string;
}

export const fetchCreateCommentsToPost = async (data: IFetchCreateComment) => {
  return $api
    .post('/create-comment', data)
    .then((response) => response.data)
    .catch((err) => err);
};
