import $api from '../../../http/index';

export const fetchGetcCommentsToPost = async (id: string) => {
  const data = { postId: id };
  return $api
    .post('/get-comments', data)
    .then((response) => response.data)
    .catch((err) => err);
};
