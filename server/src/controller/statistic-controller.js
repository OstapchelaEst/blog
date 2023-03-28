import { validationResult } from "express-validator";
import modelPosts from "../models/model-posts.js";
import { checkErrors } from "../validation/check-errors-array.js";

class StatisticController {
  async getCountAllpostsLiked(req, res, next) {
    try {
      const errors = validationResult(req);
      checkErrors(errors);
      const userId = req.body.userId;
      const allLikedPosts = await modelPosts.find({
        whoLikes: { $in: [userId] },
      });
      const count = Object.keys(allLikedPosts).length;
      res.status(200).json({ countLikes: count });
    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticController();
