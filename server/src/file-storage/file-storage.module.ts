import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { FileStorageController } from './file-storage.controller';
import { PipesModule } from '../pipes/pipes.module';

@Module({
  imports: [PipesModule],
  exports: [FileStorageService],
  providers: [FileStorageService],
  controllers: [FileStorageController],
})
export class FileStorageModule {}
