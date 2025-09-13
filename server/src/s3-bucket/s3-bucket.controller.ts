import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { S3BucketService } from './s3-bucket.service';
import { DeleteFileDto } from './dto/delete-file.dto';
import { BucketFolders, Roles } from '../schemas/enums';
import { DeleteFolderDto } from './dto/delete-folder.dto';
import { DownloadFileDto } from './dto/download-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard, UserRoles } from '../auth/roles.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Get,
  Req,
  Res,
  Post,
  Body,
  Query,
  Delete,
  Logger,
  UseGuards,
  Controller,
  UploadedFiles,
  StreamableFile,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@ApiTags('S3 Bucket')
@Controller('s3')
@UseGuards(AuthGuard, RolesGuard)
@UserRoles(Roles.MANAGER)
@ApiBearerAuth()
export class S3BucketController {
  constructor(private readonly s3Service: S3BucketService) {}
  private readonly logger = new Logger(S3BucketController.name);

  @Get('download')
  @ApiOperation({ summary: 'Download a file by key' })
  @ApiResponse({ status: 200, description: 'File stream returned' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async download(@Query() query: DownloadFileDto, @Res({ passthrough: true }) res: Response) {
    const { key } = query;
    this.logger.log(`Downloading file with key: ${key}`);

    try {
      const downloadedFile = await this.s3Service.downloadFile(key);
      if (!downloadedFile) {
        throw new NotFoundException('File not found');
      }

      const { contentType, stream } = downloadedFile;
      const filename = encodeURIComponent(key.split('/').pop() || 'file');

      res.set({
        'Content-Type': contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="file"; filename*=UTF-8''${filename}`,
      });

      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(`Error downloading file with key ${key}: ${error.message}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('An error occurred while downloading the file');
    }
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 5, { limits: { fileSize: 5 * 1024 * 1024 } }))
  @ApiOperation({ summary: 'Upload one or multiple files to S3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Folder and files to upload',
    schema: {
      type: 'object',
      properties: {
        folder: { enum: Object.values(BucketFolders), type: 'string' },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
      required: ['folder', 'files'],
    },
  })
  @ApiResponse({ status: 201, description: 'Files uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid files' })
  @ApiResponse({ status: 500, description: 'Error occurred while uploading files' })
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folder') folder: BucketFolders,
    @Req() req: any,
  ) {
    const user = req.user;
    const organizationName = user.organizationId;

    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    if (!Object.values(BucketFolders).includes(folder)) {
      throw new BadRequestException('Invalid folder');
    }

    this.logger.log(`Uploading files for organization: ${organizationName}`);

    try {
      const uploadResults = await this.s3Service.uploadMultipleFiles(organizationName, folder, files);

      this.logger.log(`${uploadResults.length} file(s) uploaded successfully`);

      return {
        message: `${uploadResults.length} file(s) uploaded successfully`,
        files: uploadResults,
      };
    } catch (error) {
      this.logger.error(`Error uploading files: ${error.message}`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete a file by key' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 500, description: 'Error occurred while deleting file' })
  async deleteFile(@Query() query: DeleteFileDto) {
    const { key } = query;

    this.logger.log(`Deleting file with key: ${key}`);

    try {
      const result = await this.s3Service.deleteFile(key);
      if (!result) {
        this.logger.warn(`File not found while deleting: ${key}`);
        throw new NotFoundException('File not found');
      }
      this.logger.log(`File deleted successfully: ${key}`);

      return {
        message: 'File deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting file with key ${key}: ${error.message}.`);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('delete-folder')
  @ApiOperation({ summary: 'Delete all files in a folder' })
  @ApiResponse({ status: 200, description: 'Folder deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid folder' })
  @ApiResponse({ status: 500, description: 'Error occurred while deleting folder' })
  async deleteFolder(@Query() query: DeleteFolderDto, @Req() req: any) {
    const { folder } = query;

    const user = req.user;
    const organizationName = user.organizationId;

    this.logger.log(`Deleting folder: ${folder}`);

    try {
      const result = await this.s3Service.deleteFolder({ folder, organizationName });

      if (!result) {
        throw new BadRequestException('Invalid folder or folder is empty');
      }

      return {
        message: 'Folder deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting folder ${folder}: ${error.message}.`);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
