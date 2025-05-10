import YAML from 'yamljs';

export const swaggerDocument = YAML.load('./src/lib/openapi/openapi.yml');
export const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    url: '/api-docs/swagger.json'
  }
};
