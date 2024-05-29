import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;

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
      user: MONGO_USER,
      pass: MONGO_PASS,
      dbName: 'ChariERP',
    });

    console.log('Connected to MongoDB');

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
