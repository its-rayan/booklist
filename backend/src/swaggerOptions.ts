import YAML from 'yamljs';

export const swaggerDocument = YAML.load('./swagger.yaml');
export const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    url: '/api-docs/swagger.json'
  }
};
