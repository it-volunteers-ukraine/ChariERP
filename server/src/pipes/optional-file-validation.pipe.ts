import { Injectable, PipeTransform } from '@nestjs/common';
import { FileValidator, MulterFile } from './interfaces/file-validator.interface';
import { FileCountValidator } from './validators/file-count.validator';
import { FileTypeValidator } from './validators/file-type.validator';
import { FileSizeValidator } from './validators/file-size.validator';

@Injectable()
export class OptionalFileValidationPipe implements PipeTransform {
  private readonly validators: FileValidator[];

  constructor() {
    this.validators = [new FileCountValidator(), new FileTypeValidator(), new FileSizeValidator()];
  }

  transform(files: MulterFile[]): MulterFile[] {
    if (!files || files.length === 0) return files;

    for (const validator of this.validators) {
      validator.validate(files);
    }

    return files;
  }
}
