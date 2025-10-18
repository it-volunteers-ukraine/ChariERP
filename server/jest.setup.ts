
import { testMongoConfig } from './test/in-memory.mongo.config';

// Set up environment variables for testing
process.env.NODE_ENV = 'test';
process.env.RESEND_API_KEY = 'test-api-key';
process.env.EMAIL_FROM = 'test@example.com';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGO_URI = 'mongodb://localhost:27017/test';

// Global test setup
beforeAll(async () => {
  await testMongoConfig.setUp();
});

afterAll(async () => {
  await testMongoConfig.dropDatabase();
});