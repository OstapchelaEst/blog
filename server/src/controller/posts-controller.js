import { APIerror } from "../exceptions/send-errors.js";
import modelPosts from "../models/model-posts.js";
import { validationResult } from "express-validator";
import { checkErrors } from "../validation/check-errors-array.js";
import mongooseServices from "../services/mongoose-services.js";
class PostsController {
  async getAllPosts(req, res, next) {
    try {
      const allPosts = await mongooseServices.findAll(modelPosts);
      const sortPosts = allPosts.sort((a, b) => {
        return b.datePublish - a.datePublish;
      });
      res.status(200).json(sortPosts);
    } catch (error) {
      next(error);
    }
  }

  async createPost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const datePublish = Date.now();
      const newPost = await modelPosts.create({ ...req.body, datePublish });

      res.status(200).json(newPost);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllUserPosts(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const authorID = req.body.id;
      const allPosts = await mongooseServices.findAll(modelPosts, { authorID });
      res.status(200).json(allPosts);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const postID = req.body.id;
      const isExistPost = await mongooseServices.findByID(modelPosts, postID);
      if (!isExistPost) {
        throw APIerror.BadRequest("Поста с таким ID не существует", []);
      }
      const deletedPost = await mongooseServices.findAndDeleteByID(
        modelPosts,
        postID
      );
      res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  }

  async ingnoreThisPost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { id, idUser } = req.body;
      const post = await mongooseServices.findByID(modelPosts, id);
      if (!post) {
        throw APIerror.BadRequest("Nothing found for this id");
      }
      post.whoIgnore.push(idUser);
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateTextPost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { id, newText } = req.body;
      const post = await mongooseServices.findByID(modelPosts, id);
      if (!post) {
        throw APIerror.BadRequest("Nothing found for this id");
      }
      post.text = newText;
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async likePost(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const { id, idUser } = req.body;
      const post = await mongooseServices.findByID(modelPosts, id);
      if (!post) {
        throw APIerror.BadRequest("Nothing found for this id");
      }
      const indexUser = post.whoLikes.indexOf(idUser);
      if (indexUser >= 0) {
        post.whoLikes.splice(indexUser, 1);
      } else {
        post.whoLikes.push(idUser);
      }
      console.log(post);
      await post.save();
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new PostsController();
