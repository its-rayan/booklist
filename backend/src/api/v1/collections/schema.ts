import { z } from 'zod';

export const createCollectionSchema = z.object({
  name: z
    .string()
    .min(1, 'Collection name is required')
    .max(255, 'Collection name must be less than 255 characters'),
  description: z.string().min(1).max(255),
  userId: z.string().min(1, 'User ID is required')
});
