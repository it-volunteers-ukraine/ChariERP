import { Injectable, PipeTransform, Logger, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  private readonly logger = new Logger(ObjectIdValidationPipe.name);

  transform(value: string) {
    if (!isValidObjectId(value)) {
      this.logger.warn(`Invalid ID format: ${value}`);
      throw new BadRequestException('Invalid ID format');
    }
    return value;
  }
}
