import { Request } from "express";
import { PrismaClient } from "@prisma/client";

import { customResponse } from "../types/responseTypes.js";
import { userQuerySchema } from "../schemas/userSchema.js";
import errorResponseHandler from "../utils/errorHandler.js";

const prisma = new PrismaClient();

const getUser = async (req: Request, res: customResponse) => {
  try {
    const { id } = userQuerySchema.parse(req.params);

    console.log(id);

    const userDetails = await prisma.user.findUnique({
      include: {
        images: true,
      },
      where: {
        id: id,
      },
    });
    const imageCount = userDetails?.images.length ?? 0;

    return res.json({ error: null, data: { ...userDetails, imageCount } });
  } catch (error: any) {
    console.log(error);
    errorResponseHandler(res, error, "Error while fetching User Data");
  }
};

export { getUser };
