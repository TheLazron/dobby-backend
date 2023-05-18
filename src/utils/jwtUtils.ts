import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import type { customResponse } from "../types/responseTypes.js";
const generateAccessToken = (email: String, userId: string): string => {
  const secret = process.env.JWT_SECRET!;
  return jwt.sign({ email, userId }, secret, { expiresIn: "1800s" });
};

const parseJwt = (token: any) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const verifyJWT = (token: string, res: customResponse, next: NextFunction) => {
  try {
    const secret = process.env.JWT_SECRET!;

    const decoded = jwt.verify(token, secret); // Replace "secret" with your actual secret key

    const parsedToken = parseJwt(token);
    const email = parsedToken.email;
    const userId = parsedToken.userId;
    res.email = email;
    res.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "token not verified" });
  }
};

export { generateAccessToken, parseJwt, verifyJWT };
