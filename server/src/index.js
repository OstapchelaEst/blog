import express from "express";
import mongoose from "mongoose";
import router from "./router/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isVladToken } from "./middlewares/is-valid-token-middleware.js";
import { errorMiddleware } from "./middlewares/error-handler-middleware.js";
const PORT = 5000;
const DB_URL = `mongodb+srv://admin:admin_app@cluster0.etgahy6.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("", router);
app.use(isVladToken);
app.use(errorMiddleware);
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
