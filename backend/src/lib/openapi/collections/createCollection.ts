import {
  CollectionSchema,
  createCollectionSchema
} from '@/api/v1/collections/schemas';
import { ZodOpenApiOperationObject } from 'zod-openapi';

export const createCollection: ZodOpenApiOperationObject = {
  operationId: 'createCollection',
  'x-speakeasy-name-override': 'create',
  'x-speakeasy-usage-example': true,
  summary: 'Create a new collection',
  description: 'Create a new collection for the authenticated user.',
  requestBody: {
    content: {
      'application/json': {
        schema: createCollectionSchema
      }
    }
  },
  responses: {
    '200': {
      description: 'The created collection',
      content: {
        'application/json': {
          schema: CollectionSchema
        }
      }
    }
  },
  tags: ['Collections'],
  security: [{ token: [] }]
};
