import { NextFunction, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const uploadImage = async (req: Request, res: Response) => {
  if (req.file) {
    const file = req.file;
    console.log("Uploaded image:");
    console.log(req.file);
    const { data, error: uploadError } = await supabase.storage
      .from("image-storage")
      .upload(uuidv4(), file.buffer, { contentType: file.mimetype });

    if (uploadError) {
      console.log("Error uploading image to Supabase storage:", uploadError);
    } else {
      console.log("Image uploaded successfully to Supabase storage:");
      //  delete req.file.buffer; // Clear the uploaded file data from memory
    }
  } else {
    console.log("no file uploaded");
  }
};

export { uploadImage };
