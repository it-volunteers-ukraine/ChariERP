import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FileStoreFolders } from '../schemas/enums';

@Injectable()
export class FolderValidationPipe implements PipeTransform {
  transform(value: any) {
    const allowedFolders = Object.values(FileStoreFolders);

    if (!allowedFolders.includes(value)) {
      throw new BadRequestException(`Invalid folder name: '${value}'. Allowed values: ${allowedFolders.join(', ')}`);
    }

    return value as FileStoreFolders;
  }
}
