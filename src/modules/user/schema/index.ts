import { z } from "zod";

export const adminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "min 4 characters"),
});

export type TAdmin = z.infer<typeof adminSchema>;
