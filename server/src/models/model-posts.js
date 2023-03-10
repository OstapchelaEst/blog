import mongoose from "mongoose";
const Posts = mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  authorID: { type: String, required: true },
  datePublish: { type: String, required: true },
  whoLikes: { type: Array },
  whoIgnore: { type: Array },
});

export default mongoose.model("Posts", Posts);
