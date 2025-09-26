import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';

@Module({
  imports: [],
  exports: [FileStorageService],
  providers: [FileStorageService],
  controllers: [FileStorageController],
})
export class FileStorageModule {}
