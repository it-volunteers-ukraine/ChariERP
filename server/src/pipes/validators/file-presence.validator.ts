import { FileValidator } from '../interfaces/file-validator.interface';
import { Logger, BadRequestException } from '@nestjs/common';

export class FilePresenceValidator implements FileValidator {
  private logger = new Logger(FilePresenceValidator.name);

  validate(files: Express.Multer.File[]): void {
    if (!files || files.length === 0) {
      this.logger.warn('No files provided');
      throw new BadRequestException('No files provided');
    }
  }
}
