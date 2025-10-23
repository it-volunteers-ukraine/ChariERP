import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ObjectStorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly config: ConfigService) {
    const region = this.config.get<string>('S3_REGION', 'fra1');
    const endpoint = `https://${region}.digitaloceanspaces.com`;
    const accessKeyId = this.config.getOrThrow<string>('SPACES_KEY');
    const secretAccessKey = this.config.getOrThrow<string>('SPACES_SECRET');

    this.s3Client = new S3Client({
      forcePathStyle: false,
      endpoint,
      region,
      credentials: { accessKeyId, secretAccessKey },
      maxAttempts: 2,
    });
  }

  get client(): S3Client {
    return this.s3Client;
  }
}
