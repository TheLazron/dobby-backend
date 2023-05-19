import { NextFunction, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { PrismaClient, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import errorResponseHandler from "../utils/errorHandler.js";
import uploadImageSupabase from "../utils/supabaseUtils.js";
import { customResponse } from "../types/responseTypes.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);
const prisma = new PrismaClient();

const uploadImage = async (req: Request, res: customResponse) => {
  console.log(req.body);

  try {
    const displayName = req.body.fileName;
    const userId = res.userId;

    let imageName = uuidv4();
    const fileName = `${userId}/${imageName}`;
    if (req.file) {
      const file = req.file;
      console.log("Uploaded image:");
      console.log(req.file);
      const uploadError = await uploadImageSupabase(file, fileName);

      if (!uploadError) {
        const imageUrl = `${process.env.SUPABASE_UPLOAD_PRE}${userId}/${imageName}`;
        console.log(imageUrl);

        try {
          const createdImage = await prisma.image.create({
            data: {
              name: displayName,
              imageUrl: imageUrl,
              userId: userId!,
            },
          });
          console.log(createdImage);
          return res.json({ error: null, data: createdImage });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      res.json({ message: "No file Received" });
    }
  } catch (error: any) {
    errorResponseHandler(error);
  }
};

const getMyImages = async (req: Request, res: customResponse) => {
  try {
    const userId = res.userId;

    const userImages = await prisma.image.findMany({
      where: {
        userId: userId,
      },
    });
    res.json({ error: null, data: userImages });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving images");
  }
};

const searchImagesByName = async (req: Request, res: customResponse) => {
  try {
    const userId = res.userId;
    const searchQ = req.query.searchString;

    // Use a regular expression to perform a case-insensitive search for images with matching names
    const images = await prisma.image.findMany({
      where: {
        userId: userId,
        name: {
          contains: searchQ as string,
          mode: "insensitive",
        },
      },
    });

    res.json({ error: null, data: images });
  } catch (error: any) {
    errorResponseHandler(res, error, "Error while retrieving images");
  }
};

export { uploadImage, getMyImages, searchImagesByName };
