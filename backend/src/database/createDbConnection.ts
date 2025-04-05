import mongoose from 'mongoose';
import config from '@/config';
import logger from '@/logger';

const connectToDbClient = async (): Promise<void> => {
  try {
    if (!config.db.uri) {
      throw new Error(`Invalid/Mssing environment variable: MONGO_URI`);
    }
    await mongoose.connect(config.db.uri);
    logger.info(`✅ Successfully connected to database`);
  } catch (error) {
    logger.error(`🚨 Failed to connect to database: ${error}`);
  }
};

export default connectToDbClient;
