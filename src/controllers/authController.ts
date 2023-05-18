import { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { comparePasswords, encryptPassowrd } from "../utils/bcryptUtils.js";
import type { loginResponse } from "../types/responseTypes.js";
import { generateAccessToken } from "../utils/jwtUtils.js";

const prisma = new PrismaClient();

const signUserUp = async (req: Request, res: Response) => {
  try {
    console.log("req", req.body);

    const { email, password, username } = req.body;

    const encryptedPass = await encryptPassowrd(password);
    const createdUser = await prisma.user.create({
      data: {
        email,
        name: username,
        password: encryptedPass,
      },
    });
    return res.json({ success: true });
  } catch (error: any) {
    console.log(error);
  }
};

const logUserIn = async (req: Request, res: Response<loginResponse>) => {
  try {
    console.log("req", req.body);
    const { email, password } = req.body;
    const loggedUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!loggedUser) {
      return res.json({
        error: "User Not Found",
        user: { found: false, token: null, userId: null },
      });
    }

    const isPasswordMatch = await comparePasswords(
      password,
      loggedUser?.password
    );

    if (!isPasswordMatch) {
      return res.json({
        error: "Invalid password",
        user: { found: false, token: null, userId: null },
      });
    }

    const token = generateAccessToken(loggedUser?.email, loggedUser?.id);
    res.json({
      error: null,
      user: { found: true, token: token, userId: loggedUser.id },
    });
  } catch (error: any) {
    console.log(error);
  }
};

export { signUserUp, logUserIn };
