import { FileValidator, MulterFile } from '../interfaces/file-validator.interface';
import { Logger, BadRequestException } from '@nestjs/common';
import { FILE_VALIDATION } from '@/constants/file-storage.constants';

export class FileTypeValidator implements FileValidator {
  private readonly logger = new Logger(FileTypeValidator.name);

  validate(files: MulterFile[]): void {
    for (const file of files) {
      if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.mimetype)) {
        this.logger.warn(
          `Invalid file type: '${file.mimetype}'. Allowed types: ${FILE_VALIDATION.ALLOWED_TYPES.join(', ')}`,
        );
        throw new BadRequestException('Invalid file type');
      }
    }
  }
}
