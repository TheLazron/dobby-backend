import { Request, Response } from "express";

const uploadImage = (req: Request, res: Response) => {
  if (req.file) {
    console.log("uploaded image");
    console.log(req.file);
  } else {
    console.log("no image uploaded");
  }
};

export { uploadImage };
