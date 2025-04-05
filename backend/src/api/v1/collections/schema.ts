import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  userId: z.string()
});
