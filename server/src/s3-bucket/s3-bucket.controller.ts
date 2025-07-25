import { Readable } from 'stream';
import { Response } from 'express';
import { S3BucketService } from './s3-bucket.service';
import { DownloadFileDto } from './dto/download-file.dto';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('S3 Bucket')
@Controller('s3')
export class S3BucketController {
  constructor(private readonly s3Service: S3BucketService) {}

  @Get('download')
  @ApiOperation({ summary: 'Download a file by key' })
  @ApiResponse({ status: 200, description: 'File stream returned' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 500, description: 'Error occurred while transferring file' })
  async download(@Query() query: DownloadFileDto, @Res() res: Response) {
    const { key } = query;

    const downloadedFile = await this.s3Service.downloadFile(key);
    if (!downloadedFile) {
      return res.status(404).send('File not found');
    }

    const { ContentType, Body } = downloadedFile;
    const filename = encodeURIComponent(key.split('/').pop() || 'file');

    res.set({
      'Content-Type': ContentType || 'application/octet-stream',
      'Content-Disposition': `inline; filename="file"; filename*=UTF-8''${filename}`,
    });

    if (Body instanceof Readable) {
      Body.pipe(res);
    } else {
      res.status(500).send('Cannot stream this file type');
    }
  }
}
