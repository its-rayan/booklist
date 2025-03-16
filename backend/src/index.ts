// loading env variables
import dotnev from 'dotenv';
dotnev.config();

import createServer from './createServer';
import config from './config';
import logger from './logger';
import connectToDbClient from './database/createDbConnection';

const bootstrapApp = async () => {
  const app = await createServer();

  // connect to database
  await connectToDbClient();

  app.listen(config.port, () =>
    logger.info(`🚀 Server is running on PORT: ${config.port}`)
  );
};

(async () => await bootstrapApp())();
