import $api from 'http/axios-instens';
import { IComment } from 'store/slices/interfaces/posts-slice-interfaces';
import { IResponseErrorBody } from './fetch-interfaces';

interface IFetchChangeComment {
  commentId: string;
  newText: string;
}

interface IFetchCreateComment {
  authorLogin: string;
  authorId: string;
  postId: string;
  text: string;
}

interface IFetchDeleteComment {
  commentId: string;
}

interface ILikeComment {
  commentId: string;
  userId: string;
}

class CommentsFetch {
  async fetchChangeCommentText(data: IFetchChangeComment) {
    return $api
      .put('/change-comment', data)
      .then<IComment>((response) => response.data)
      .catch<IResponseErrorBody>((err) => {
        throw err.response;
      });
  }

  async fetchCreateCommentsToPost(data: IFetchCreateComment) {
    return $api
      .post('/create-comment', data)
      .then<IComment>((response) => response.data)
      .catch<IResponseErrorBody>((err) => {
        throw err.response;
      });
  }

  async fetchDeleteComment(data: IFetchDeleteComment) {
    return $api
      .delete('/delete-comment', { data })
      .then<IComment>((response) => response.data)
      .catch<IResponseErrorBody>((err) => {
        throw err.response;
      });
  }

  async fetchGetcCommentsToPost(data: { postId: string }) {
    return $api
      .post('/get-comments', data)
      .then<IComment[]>((response) => response.data)
      .catch((err) => {
        throw err.response;
      });
  }

  async fetchLikeComment(data: ILikeComment) {
    return $api
      .post('/like-comment', data)
      .then<IComment>((response) => response.data)
      .catch<IResponseErrorBody>((err) => {
        throw err.response;
      });
  }
}

export default new CommentsFetch();
