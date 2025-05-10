import winston, { format } from 'winston';
import expressWinston from 'express-winston';
import { NextFunction, Request, Response } from 'express';

let loggerOptions = {
  transports: [new winston.transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.prettyPrint()
  ),
  meta: true,
  colorize: false,
  expressFormat: true
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  // logger options for error logs
  loggerOptions = {
    ...loggerOptions,
    format: format.combine(
      format.simple(),
      format.align(),
      format.prettyPrint(),
      format.cli({
        colors: {
          info: 'blue',
          error: 'red',
          warn: 'yellow'
        }
      }),
      format.timestamp(),
      format.colorize({ all: true })
    ),
    colorize: true,
    expressFormat: true
  };
}

// mock middleware for testing
let middleware = expressWinston.logger(loggerOptions);

// if not in test environment, use expressWinston logger
if (process.env.NODE_ENV === 'test') {
  middleware = (req: Request, res: Response, next: NextFunction): void => {
    next();
  };
}

// normal logger instance
const logger = winston.createLogger(loggerOptions);

// http logger middleware
export const loggerMiddleware = middleware;

// use always instead of console.log
export default logger;
