import fs from 'fs';
import path from 'path';
import { createDocument } from 'zod-openapi';
import { collectionsPaths } from './collections';
import { CollectionSchema } from '../../api/v1/collections/schemas';

import { stringify } from 'yaml';

export const document = createDocument({
  openapi: '3.0.3',
  info: {
    title: 'Booklist API',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  paths: {
    ...collectionsPaths
  },
  components: {
    schemas: {
      CollectionSchema
    }
  }
});

// Write the OpenAPI document to a YAML file
const yaml = stringify(document, { aliasDuplicateObjects: false });
fs.writeFileSync(path.join(__dirname, 'openapi.yml'), yaml);
