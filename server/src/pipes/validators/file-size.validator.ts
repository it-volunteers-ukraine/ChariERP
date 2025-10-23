import { FileValidator, MulterFile } from '../interfaces/file-validator.interface';
import { Logger, BadRequestException } from '@nestjs/common';
import { FILE_VALIDATION } from '@/constants/file-storage.constants';

export class FileSizeValidator implements FileValidator {
  private readonly logger = new Logger(FileSizeValidator.name);

  validate(files: MulterFile[]): void {
    for (const file of files) {
      if (file.size > FILE_VALIDATION.MAX_SIZE) {
        const maxSizeMB = Math.round(FILE_VALIDATION.MAX_SIZE / 1024 / 1024);
        const fileSizeMb = (file.size / (1024 * 1024)).toFixed(2);

        this.logger.warn(
          `File too large: '${file.originalname}' (${fileSizeMb} MB). Allowed max size is ${maxSizeMB} MB`,
        );
        throw new BadRequestException(
          `File '${file.originalname}' exceeds the maximum allowed size of ${maxSizeMB} MB`,
        );
      }
    }
  }
}
