import bcrypt from "bcrypt";

const encryptPassowrd = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePasswords = async (
  password1: string,
  password2: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password1, password2);
  return isMatch;
};

export { encryptPassowrd, comparePasswords };
