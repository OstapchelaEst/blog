import $api from '../../../http/index';
export const fetchLikeComment = async (data: { commentId: string; userId: string }) => {
  return $api
    .post('/like-comment', data)
    .then((response) => response.data)
    .catch((err) => {
      throw err;
    });
};
