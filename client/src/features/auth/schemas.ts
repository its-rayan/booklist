import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be less than 255 characters")
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Password must contain at least one number, one uppercase, and one lowercase letter"
  );

export const emailSchema = z
  .string()
  .email()
  .min(1)
  .transform((email) => email.toLowerCase());

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: emailSchema,
  password: passwordSchema,
});

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
