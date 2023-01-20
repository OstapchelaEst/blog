import { sendError } from "../exaptions/send-errors.js";
import modelPosts from "../models/model-posts.js";
import { validationResult } from "express-validator";
import { checkErrors } from "../validation/check-errors-array.js";
import mongooseServices from "../services/mongoose-services.js";
class PostsController {
  async getAllPosts(req, res) {
    try {
      const allPosts = await mongooseServices.findAll(modelPosts);
      res.status(200).json(allPosts);
    } catch (error) {
      sendError(res, error);
    }
  }

  async createPost(req, res) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const newPost = await modelPosts.create(req.body);
      const a = await mongooseServices.create(modelPosts, req.body);
      res.status(200).json(newPost);
    } catch (error) {
      sendError(res, error);
    }
  }

  async getAllUserPosts(req, res) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const authorID = req.body.id;
      const allPosts = await mongooseServices.findAll(modelPosts, { authorID });
      res.status(200).json(allPosts);
    } catch (error) {
      sendError(res, error);
    }
  }

  async deletePost(req, res) {
    try {
      const postID = req.body.id;
      const isExistPost = await mongooseServices.findBy(
        "_id",
        postID,
        modelPosts
      );
      if (!isExistPost) {
        throw new Error("Поста с таким ID не существует");
      }
      const deletedPost = await mongooseServices.findAndDeleteByID(
        modelPosts,
        postID
      );
      res.status(200).json(deletedPost);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default new PostsController();
