import { Injectable, PipeTransform } from '@nestjs/common';
import { FileValidator, MulterFile } from './interfaces/file-validator.interface';
import { FilePresenceValidator } from './validators/file-presence.validator';
import { FileCountValidator } from './validators/file-count.validator';
import { FileTypeValidator } from './validators/file-type.validator';
import { FileSizeValidator } from './validators/file-size.validator';

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

  transform(files: MulterFile[]): MulterFile[] {
    for (const validator of this.validators) {
      validator.validate(files);
    }

    return files;
  }
}
