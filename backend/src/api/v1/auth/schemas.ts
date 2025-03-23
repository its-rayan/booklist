import { z } from 'zod';

export const signInSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email()
});
