import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);

app.listen(process.env.PORT || 3700, () => {
  console.log("Server running on port 3700");
});
