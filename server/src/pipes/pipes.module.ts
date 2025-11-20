import { Module } from '@nestjs/common';
import { FileValidationPipe } from './file-validation.pipe';
import { ObjectIdValidationPipe } from './object-id-validation.pipe';
import { FolderValidationPipe } from './folder-validation.pipe';

@Module({
  providers: [FileValidationPipe, ObjectIdValidationPipe, FolderValidationPipe],
  exports: [FileValidationPipe, ObjectIdValidationPipe, FolderValidationPipe],
})
export class PipesModule {}
