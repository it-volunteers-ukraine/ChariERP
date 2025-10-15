import { Logger, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { FILE_VALIDATION } from '../constants/file-storage.constants';

interface FileValidator {
  validate(files: Express.Multer.File[]): void;
}

class FilePresenceValidator implements FileValidator {
  private logger = new Logger(FilePresenceValidator.name);

  validate(files: Express.Multer.File[]): void {
    if (!files || files.length === 0) {
      this.logger.warn('No files provided');
      throw new BadRequestException('No files provided');
    }
  }
}

class FileCountValidator implements FileValidator {
  private logger = new Logger(FileCountValidator.name);

  validate(files: Express.Multer.File[]): void {
    if (files.length > FILE_VALIDATION.MAX_FILES) {
      this.logger.warn(`Too many files: received ${files.length}. Max allowed is ${FILE_VALIDATION.MAX_FILES}`);
      throw new BadRequestException(`You can upload up to ${FILE_VALIDATION.MAX_FILES} files only`);
    }
  }
}

class FileTypeValidator implements FileValidator {
  private logger = new Logger(FileTypeValidator.name);

  validate(files: Express.Multer.File[]): void {
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

class FileSizeValidator implements FileValidator {
  private logger = new Logger(FileSizeValidator.name);

  validate(files: Express.Multer.File[]): void {
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

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly validators: FileValidator[];

  constructor() {
    this.validators = [
      new FilePresenceValidator(),
      new FileCountValidator(),
      new FileTypeValidator(),
      new FileSizeValidator(),
    ];
  }

  transform(files: Express.Multer.File[]): Express.Multer.File[] {
    for (const validator of this.validators) {
      validator.validate(files);
    }

    return files;
  }
}
