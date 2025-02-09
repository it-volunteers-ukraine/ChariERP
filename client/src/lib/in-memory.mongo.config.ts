import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class InMemoryMongoConfig {
  private mongo: MongoMemoryServer | undefined;

  public setUp = async () => {
    process.env.MONGO_URI = 'mongodb://test-connection-string/';
    this.mongo = await MongoMemoryServer.create();
    const url = this.mongo.getUri();

    await mongoose.connect(url);
  };

  public dropDatabase = async () => {
    if (this.mongo) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await this.mongo.stop();
    }
  };

  public dropCollections = async () => {
    if (this.mongo) {
      const collections = mongoose.connection.collections;

      for (const key in collections) {
        const collection = collections[key];

        await collection.deleteMany();
      }
    }
  };
}

export const testMongoConfig = new InMemoryMongoConfig();
