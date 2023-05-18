import express, { NextFunction, Response, Request } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import imageRouter from "./routers/imageRouter.js";
import { customResponse } from "./types/responseTypes.js";
import { verifyJWT } from "./utils/jwtUtils.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
const verifyToken = (req: Request, res: customResponse, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("provide token");
    return res
      .status(401)
      .json({ message: "Provide with a valid authentication token" });
  }

  verifyJWT(token, res, next);
};
app.use(authRouter);
app.use(verifyToken);
app.use(imageRouter);
app.listen(process.env.PORT || 3700, () => {
  console.log("Server running on port 3700");
});
