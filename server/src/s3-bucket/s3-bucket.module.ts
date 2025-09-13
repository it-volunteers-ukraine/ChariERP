import { Module } from '@nestjs/common';

import { S3BucketService } from './s3-bucket.service';
import { S3BucketController } from './s3-bucket.controller';

@Module({
  imports: [],
  exports: [S3BucketService],
  providers: [S3BucketService],
  controllers: [S3BucketController],
})
export class S3BucketModule {}
