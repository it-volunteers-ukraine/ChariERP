import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BucketFolders } from '../../schemas/enums';

export class DeleteFolderDto {
  @ApiProperty({
    description: 'Folder to delete',
    enum: BucketFolders,
  })
  @IsEnum(BucketFolders)
  folder: BucketFolders;
}
