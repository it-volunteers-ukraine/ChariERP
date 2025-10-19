import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesResponse {
  @ApiProperty({ example: '1 file(s) uploaded successfully' })
  message: string;

  @ApiProperty({ example: ['DEV/68933c43b1a8c178175d1869/fixed-assets/mustang.jpg'] })
  files: string[];
}
