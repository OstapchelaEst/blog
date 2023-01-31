import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Registration" },
  refreshToken: { type: String, required: true },
});

export default model("TokenModel", TokenSchema);
