import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { PipesModule } from '../pipes/pipes.module';
import { S3ClientService } from '../s3/s3-client.service';

@Module({
  imports: [PipesModule],
  exports: [FileStorageService],
  providers: [FileStorageService, S3ClientService],
  controllers: [FileStorageController],
})
export class FileStorageModule {}
