import { ZodOpenApiPathsObject } from 'zod-openapi';
import { createCollection } from './createCollection';

export const collectionsPaths: ZodOpenApiPathsObject = {
  '/collections': {
    post: createCollection
  }
};
