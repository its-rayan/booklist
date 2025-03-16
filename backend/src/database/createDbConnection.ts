import { MongoClient, ServerApiVersion } from 'mongodb';
import config from '../config';
import logger from '../logger';

if (!config.db.uri) {
  throw new Error(`Invalid/Mssing environment variable: MONGO_URI`);
}

const client = new MongoClient(config.db.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const connectToDbClient = async (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    try {
      client.connect();
      logger.info(`✅ Successfully connected to database`);
      resolve(`Successfully connected to database`);
    } catch (error) {
      logger.error(`🚨 Failed to connect to database: ${error}`);
      reject(`Failed to connect to database: ${error}`);
    }
  });
};

export default connectToDbClient;
