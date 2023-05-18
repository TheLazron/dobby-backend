import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import imageRouter from "./routers/imageRouter.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "25mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);

app.use(imageRouter);
app.use(authRouter);

app.listen(process.env.PORT || 3700, () => {
  console.log("Server running on port 3700");
});
