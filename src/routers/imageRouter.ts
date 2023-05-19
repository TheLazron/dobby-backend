import express, { Router } from "express";
import {
  getMyImages,
  searchImagesByName,
  uploadImage,
} from "../controllers/imageController.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const imageRouter: Router = express.Router();

imageRouter.post("/upload-image", upload.single("image"), uploadImage);
imageRouter.get("/get-my-images", getMyImages);
imageRouter.post("/search-images", searchImagesByName);

export default imageRouter;
