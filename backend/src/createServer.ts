import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument, swaggerOptions } from './swaggerOptions';
import logger, { loggerMiddleware } from './logger';
import routes from './api/v1/routes';

export default (): Promise<express.Application> => {
  return new Promise<express.Application>((resolve, reject) => {
    try {
      logger.info('Starting server');

      const app = express();

      app.use(helmet());

      app.use(cookieParser());

      app.use(
        session({
          secret: 'keyboard cat',
          resave: false, // don't save session if unmodified
          saveUninitialized: false // don't create session until something stored
        })
      );

      app.use(passport.initialize());
      app.use(passport.authenticate('session'));

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
