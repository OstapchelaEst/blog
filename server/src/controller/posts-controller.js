import { sendError } from "../exaptions/send-errors.js";
import modelPosts from "../models/model-posts.js";
import { validationResult } from "express-validator";
import { checkErrors } from "../validation/check-errors-array.js";

class PostsController {
  async getAllPosts(req, res) {
    try {
      const allPosts = await modelPosts.find();
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
      const allPosts = await modelPosts.find({ authorID });
      res.status(200).json(allPosts);
    } catch (error) {
      sendError(res, error);
    }
  }

  async deletePost(req, res) {
    try {
      const postID = req.body.id;
      const isExistPost = await modelPosts.findById(postID);
      if (!isExistPost) {
        throw new Error("Поста с таким ID не существует");
      }
      const deletedPost = await modelPosts.findByIdAndDelete(postID);
      res.status(200).json(deletedPost);
    } catch (error) {
      sendError(res, error);
    }
  }
}

export default new PostsController();
