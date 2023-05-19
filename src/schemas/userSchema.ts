import { z } from "zod";

const userQuerySchema = z.object({
  id: z.string(),
});

export { userQuerySchema };
