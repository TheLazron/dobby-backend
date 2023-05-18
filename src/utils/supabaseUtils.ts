import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

const uploadImageSupabase = async (file: any, imageName: string) => {
  const { data, error: uploadError } = await supabase.storage
    .from("image-storage")
    .upload(imageName, file.buffer, { contentType: file.mimetype });

  if (uploadError) {
    console.log("Error while uploading image", uploadError);
  } else {
    console.log("Image uploaded successfully");
  }

  return uploadError;
};

export default uploadImageSupabase;
