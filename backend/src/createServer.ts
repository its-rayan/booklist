import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument, swaggerOptions } from './swaggerOptions';
import logger, { loggerMiddleware } from './logger';
import routes from './api/v1/routes';

export default (): Promise<express.Application> => {
  return new Promise<express.Application>((resolve, reject) => {
    try {
      logger.info('Starting server');
      // Create an Express application
      const app = express();

      // Add generic Middlewares
      app.use(helmet());

      app.use(cors());

      app.use(express.json());

      app.use(loggerMiddleware);

      app.use(
        '/api/v1/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
          swaggerOptions
        })
      );

      app.use('/api/v1', routes);

      resolve(app);
    } catch (error) {
      logger.error('🛑 Failed to start server');
      reject(error);
    }
  });
};
