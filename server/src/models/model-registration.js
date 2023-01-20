import mongoose from "mongoose";

const Registration = mongoose.Schema({
  login: {
    type: String,
    requred: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("Registration", Registration);
