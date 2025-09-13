import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileDto {
  @ApiProperty({
    required: true,
    description: 'Full path (key) to the file in S3 storage',
    example: 'my-org/file.png',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}
