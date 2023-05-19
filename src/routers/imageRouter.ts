import express, { Router } from "express";
import { getMyImages, uploadImage } from "../controllers/imageController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const imageRouter: Router = express.Router();

imageRouter.post("/upload-image", upload.single("image"), uploadImage);
imageRouter.get("/get-my-images", getMyImages);

export default imageRouter;
