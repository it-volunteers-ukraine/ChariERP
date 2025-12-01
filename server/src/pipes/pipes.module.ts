import { Module } from '@nestjs/common';
import { FileValidationPipe } from './file-validation.pipe';
import { ObjectIdValidationPipe } from './object-id-validation.pipe';
import { FolderValidationPipe } from './folder-validation.pipe';
import { OptionalFileValidationPipe } from './optional-file-validation.pipe';

@Module({
  providers: [FileValidationPipe, OptionalFileValidationPipe, ObjectIdValidationPipe, FolderValidationPipe],
  exports: [FileValidationPipe, OptionalFileValidationPipe, ObjectIdValidationPipe, FolderValidationPipe],
})
export class PipesModule {}
