import { BadRequestException, Injectable, PipeTransform, Logger } from '@nestjs/common';
import { FILE_VALIDATION } from '../constants/file-storage.constants';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly logger = new Logger(FileValidationPipe.name);

  transform(files: Express.Multer.File[]): Express.Multer.File[] {
    if (!files || files.length === 0) {
      this.logger.warn('No files provided');
      throw new BadRequestException('No files provided');
    }

    if (files.length > FILE_VALIDATION.MAX_FILES) {
      this.logger.warn(`Too many files: received ${files.length}. Max allowed is ${FILE_VALIDATION.MAX_FILES}`);
      throw new BadRequestException(`You can upload up to ${FILE_VALIDATION.MAX_FILES} files only`);
    }

    for (const file of files) {
      if (!FILE_VALIDATION.ALLOWED_TYPES.includes(file.mimetype)) {
        this.logger.warn(
          `Invalid file type: '${file.mimetype}'. Allowed types: ${FILE_VALIDATION.ALLOWED_TYPES.join(', ')}`,
        );
        throw new BadRequestException('Invalid file type');
      }

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

    return files;
  }
}
