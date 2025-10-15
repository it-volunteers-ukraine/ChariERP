import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { PipesModule } from '../pipes/pipes.module';
import { ObjectStorageService } from '../s3/object-storage.service';

@Module({
  imports: [PipesModule],
  exports: [FileStorageService],
  providers: [FileStorageService, ObjectStorageService],
  controllers: [FileStorageController],
})
export class FileStorageModule {}
