import mongoose from 'mongoose';
import logger from '@/utils/logger/logger';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;

  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
  }

  try {
    if (mongoose.connection?.readyState === mongoose.ConnectionStates.connected) {
      return { success: true };
    }

    await mongoose.connect(MONGO_URI, {
      dbName: 'ChariERP',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 5000,
    });

    if (!mongoose.connection.db) {
      return { error: 'Database connection failed' };
    }

    const document = await mongoose.connection.db.admin().command({ ping: 1 });

    logger.info('Connected to MongoDB');

    return { success: true, document };
  } catch (error) {
    return { error };
  }
};

export default connectDB;
