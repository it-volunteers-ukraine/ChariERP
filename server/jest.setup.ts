import { ConfigService } from '@nestjs/config';

const mockEnvs: Record<string, string> = {
  S3_REGION: 'test-region',
  S3_BUCKET_ID: 'test-bucket',
  SPACES_KEY: 'test-key',
  SPACES_SECRET: 'test-secret',
  FILE_STORAGE_FOLDER: 'TEST',
};

beforeAll(() => {
  const getMock = (key: string) => mockEnvs[key] ?? null;
  
  const getOrThrowMock = (key: string) => {
    const value = mockEnvs[key];

    if (!value) throw new Error(`Missing config for key: ${key}`);

    return value;
  };

  jest.spyOn(ConfigService.prototype, 'get').mockImplementation(getMock);
  jest.spyOn(ConfigService.prototype, 'getOrThrow').mockImplementation(getOrThrowMock);
});
