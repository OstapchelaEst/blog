import $api from '../../../http/index';

interface IFetchChangeComment {
  commentId: string;
  newText: string;
}

export const fetchChangeCommentText = async (data: IFetchChangeComment) => {
  return $api
    .put('/change-comment', data)
    .then((response) => response.data)
    .catch((err) => err);
};
