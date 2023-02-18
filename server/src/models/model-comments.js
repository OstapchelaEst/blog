import mongoose from "mongoose";

const Comments = mongoose.Schema({
  authorLogin: { type: String },
  authorId: { type: String },
  datePublish: { type: String },
  postId: { type: String },
  text: { type: String },
  whoLikes: { type: Array },
});

export default mongoose.model("Comments", Comments);
