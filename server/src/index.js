import express from "express";
import mongoose from "mongoose";
import router from "./router/router.js";
import { isVladToken } from "./middlewares/is-valid-token.js";
const PORT = 5000;
const DB_URL = `mongodb+srv://admin:admin_app@cluster0.etgahy6.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());
app.use("", router);
app.use(isVladToken);
mongoose.set("strictQuery", false);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server start at port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startApp();
