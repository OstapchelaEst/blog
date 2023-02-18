import $api from '../../../http/index';

interface IFetchDeleteComment {
  commentId: string;
}

export const fetchDeleteComment = async (data: IFetchDeleteComment) => {
  return $api
    .delete('/delete-comment', { data })
    .then((response) => response.data)
    .catch((err) => err);
};
