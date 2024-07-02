import mongoose from 'mongoose';

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
  }

  try {
    if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
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

    const document = await mongoose.connection.db.admin().command({ ping: 1 });

    console.log('Connected to MongoDB');

    return document;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
