import { Response as ExpressResponse } from "express";

interface loginResponse {
  error: string | null;
  user: {
    found: boolean;
    token: string | null;
    userId: string | null;
  };
}

interface customResponse extends ExpressResponse {
  email?: string;
  userId?: string;
}

export { loginResponse, customResponse };
