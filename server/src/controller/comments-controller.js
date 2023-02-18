import { validationResult } from "express-validator";
import modelComments from "../models/model-comments.js";
import { checkErrors } from "../validation/check-errors-array.js";
import { APIerror } from "../exceptions/send-errors.js";
class CommentsController {
  async createComment(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const datePublish = Date.now();
      console.log(datePublish);
      const comment = {
        ...req.body,
        datePublish,
      };
      console.log(comment);
      const newComment = await modelComments.create(comment);

      res.status(200).json(newComment);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsToPost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const allComments = await modelComments.find({ postId: req.body.postId });
      res.status(200).json(allComments);
    } catch (error) {
      next(error);
    }
  }

  async likePost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { commentId, userId } = req.body;
      const comment = await modelComments.findById(commentId);
      if (!comment) {
        throw APIerror.BadRequest("Nothing found for this id");
      }
      const indexUser = comment.whoLikes.indexOf(userId);
      if (indexUser >= 0) {
        comment.whoLikes.splice(indexUser, 1);
      } else {
        comment.whoLikes.push(userId);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async changeTextComment(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { commentId, newText } = req.body;
      const comment = await modelComments.findById(commentId);
      if (!comment) {
        throw APIerror.BadRequest("Nothing found for this id");
      }
      comment.text = newText;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const commentId = req.body.commentId;
      const isExistPost = await modelComments.findById(commentId);
      if (!isExistPost) {
        throw APIerror.BadRequest("Nothing found for this id", []);
      }
      const deletedComment = await modelComments.findByIdAndDelete(commentId);
      res.status(200).json(deletedComment);
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentsController();
