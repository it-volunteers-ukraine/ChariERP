import { FileValidator, MulterFile } from '../interfaces/file-validator.interface';
import { Logger, BadRequestException } from '@nestjs/common';
import { FILE_VALIDATION } from '@/constants/file-storage.constants';

export class FileCountValidator implements FileValidator {
  private readonly logger = new Logger(FileCountValidator.name);

  validate(files: MulterFile[]): void {
    if (files.length > FILE_VALIDATION.MAX_FILES) {
      this.logger.warn(`Too many files: received ${files.length}. Max allowed is ${FILE_VALIDATION.MAX_FILES}`);
      throw new BadRequestException(`You can upload up to ${FILE_VALIDATION.MAX_FILES} files only`);
    }
  }
}
