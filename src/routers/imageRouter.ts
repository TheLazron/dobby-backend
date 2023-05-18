import express, { Router } from "express";
import { uploadImage } from "../controllers/imageController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
// import { logUserIn, signUserUp } from "../controllers/authController.js";

const imageRouter: Router = express.Router();

imageRouter.post("/upload-image", upload.single("image"), uploadImage);
// authRouter.post("/login", logUserIn);

export default imageRouter;
