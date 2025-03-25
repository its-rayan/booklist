import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email()
});

export const signInSchema = z.object({
  email: z.string().email()
});
