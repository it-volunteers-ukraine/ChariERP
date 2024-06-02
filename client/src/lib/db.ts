import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error(
      'Please define the MONGO_URI environment variable inside .env',
    );
  }

  try {
    if (mongoose.connections[0].readyState) {
      return true;
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

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Connected to MongoDB');

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.disconnect();
  }
};

export default connectDB;
