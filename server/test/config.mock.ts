import { ConfigService } from '@nestjs/config';

export const mockConfigService = {
  get: (key: string) => {
    const mockEnvs = {
      S3_REGION: 'test-region',
      S3_BUCKET_ID: 'test-bucket',
      SPACES_KEY: 'test-key',
      SPACES_SECRET: 'test-secret',
      FILE_STORAGE_FOLDER: 'TEST',
    };
    return mockEnvs[key] ?? null;
  },
  getOrThrow: (key: string) => {
    const value = mockConfigService.get(key);
    if (!value) throw new Error(`Missing config for key: ${key}`);
    return value;
  },
} as ConfigService;
