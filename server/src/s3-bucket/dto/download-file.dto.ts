import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DownloadFileDto {
  @ApiProperty({
    required: true,
    description: 'Full path (key) to the file in S3 storage',
    example: 'my-org/file.png',
  })
  @IsString()
  @IsNotEmpty()
  key: string;
}
