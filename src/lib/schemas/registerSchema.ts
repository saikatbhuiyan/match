import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must contain at least 3 character(s)" }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
