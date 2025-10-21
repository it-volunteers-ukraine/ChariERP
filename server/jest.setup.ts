import { ConfigService } from '@nestjs/config';
import { testMongoConfig } from './test/in-memory.mongo.config';

// Set up environment variables for testing
process.env.NODE_ENV = 'test';
process.env.RESEND_API_KEY = 'test-api-key';
process.env.EMAIL_FROM = 'test@example.com';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGO_URI = 'mongodb://localhost:27017/test';

const mockEnvs: Record<string, string> = {
  S3_REGION: 'test-region',
  S3_BUCKET_ID: 'test-bucket',
  SPACES_KEY: 'test-key',
  SPACES_SECRET: 'test-secret',
  FILE_STORAGE_FOLDER: 'TEST',
};

beforeAll(async () => {
  await testMongoConfig.setUp();
  const getMock = (key: string) => mockEnvs[key] ?? null;

  const getOrThrowMock = (key: string) => {
    const value = mockEnvs[key];

    if (!value) throw new Error(`Missing config for key: ${key}`);

    return value;
  };

  jest.spyOn(ConfigService.prototype, 'get').mockImplementation(getMock);
  jest.spyOn(ConfigService.prototype, 'getOrThrow').mockImplementation(getOrThrowMock);
});

afterEach(async () => {
  await testMongoConfig.dropCollections();
  jest.clearAllMocks();
});


afterAll(async () => {
  await testMongoConfig.dropDatabase();
  jest.restoreAllMocks();
});
