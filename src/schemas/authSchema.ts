import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  username: z.string().max(40),
  password: z.string(),
  profileUrl: z.string().url(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { signUpSchema, loginSchema };
