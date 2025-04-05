import z from '../../../lib/zod';

export const createCollectionSchema = z.object({
  name: z
    .string()
    .min(1, 'Collection name is required')
    .max(255, 'Collection name must be less than 255 characters'),
  description: z.string().min(1).max(255),
  userId: z.string().min(1, 'User ID is required')
});

/*************************************
 ***** REQUIRED FOR SWAGGER DOCS *****
 *************************************/
export const CollectionSchema = z
  .object({
    id: z.string().describe('The unique identifier for the collection'),
    name: z.string().describe('The name of the collection'),
    description: z.string().describe('The description of the collection'),
    userId: z.string().describe('The ID of the user who owns the collection'),
    books: z
      .array(z.string())
      .describe('The IDs of the books in the collection'),
    createdAt: z
      .date()
      .describe('The date and time when the collection was created'),
    updatedAt: z
      .date()
      .describe('The date and time when the collection was last updated')
  })
  .openapi({ title: 'Collection' });
