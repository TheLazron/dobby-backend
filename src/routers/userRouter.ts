import express, { Router } from "express";
import { getUser } from "../controllers/userController.js";

const userRouter: Router = express.Router();

userRouter.get("/get-user/:id", getUser);

export default userRouter;
