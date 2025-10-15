import { ConfigService } from '@nestjs/config';

beforeAll(() => {
  jest.spyOn(ConfigService.prototype, 'get').mockImplementation((key: string) => {
    const mockEnvs: Record<string, string> = {
      S3_REGION: 'test-region',
      S3_BUCKET_ID: 'test-bucket',
      SPACES_KEY: 'test-key',
      SPACES_SECRET: 'test-secret',
      FILE_STORAGE_FOLDER: 'TEST',
    };
    
    return mockEnvs[key] ?? null;
  });

  jest.spyOn(ConfigService.prototype, 'getOrThrow').mockImplementation((key: string) => {
    const mockEnvs: Record<string, string> = {
      S3_REGION: 'test-region',
      S3_BUCKET_ID: 'test-bucket',
      SPACES_KEY: 'test-key',
      SPACES_SECRET: 'test-secret',
      FILE_STORAGE_FOLDER: 'TEST',
    };

    const value = mockEnvs[key];

    if (!value) throw new Error(`Missing config for key: ${key}`);

    return value;
  });
});
