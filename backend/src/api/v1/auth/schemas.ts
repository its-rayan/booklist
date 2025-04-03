import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255)
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255)
});
