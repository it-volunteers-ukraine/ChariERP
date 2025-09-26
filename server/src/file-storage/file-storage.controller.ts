import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { FileStoreFolders, Roles } from '../schemas/enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RolesGuard, UserRoles } from '../auth/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  ParseEnumPipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Controller for file storage operations.
 * Provides file upload, download, and deletion functionalities.
 * Access is restricted to users with the MANAGER role.
 */
@ApiTags('File Storage')
@Controller('file-storage')
@UseGuards(AuthGuard, RolesGuard)
@UserRoles(Roles.MANAGER)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
export class FileStorageController {
  private readonly logger = new Logger(FileStorageController.name);

  constructor(private readonly fileStorageService: FileStorageService) {}

  /**
   * Download a file by its key.
   * @param key - File key (path where the file is stored in storage).
   * @param res - Express response object with passthrough enabled.
   * @throws NotFoundException when the file is not found.
   * @throws InternalServerErrorException when a server error occurs.
   * @returns A streamable file for client download.
   */
  @Get()
  @ApiOperation({ summary: 'Download a file by key' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'The file key to download',
  })
  @ApiResponse({ status: 200, description: 'File stream returned' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async download(@Query('key') key: string, @Res({ passthrough: true }) res: Response) {
    this.logger.log(`Downloading file with key: ${key}`);

    try {
      const downloadedFile = await this.fileStorageService.downloadFile(key);
      if (!downloadedFile) {
        throw new NotFoundException('File not found');
      }

      const { contentType, stream } = downloadedFile;
      this.logger.log(`contentType: ${contentType}`);
      const filename = encodeURIComponent(key.split('/').pop() || 'file');

      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
      });

      return new StreamableFile(stream);
    } catch (error) {
      this.logger.error(`Error downloading file with key ${key}: ${error.message}`, error.stack);
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('An error occurred while downloading the file');
    }
  }

  /**
   * Upload multiple files to a designated folder.
   * Limits: max 5 files, max file size 5 MB.
   * @param files - Array of files uploaded via multipart request.
   * @param folder - Target folder name from the FileStoreFolders enum.
   * @param req - Request object containing user information.
   * @throws BadRequestException when no files provided or too many files.
   * @throws InternalServerErrorException when a server error occurs.
   * @returns Message about successful upload and file key array.
   */
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES, {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (req, file, cb) => {
        const filesCount = req.files ? req.files.length : 0;

        if (filesCount > MAX_FILES) {
          return cb(new BadRequestException(`Cannot upload more than ${MAX_FILES} files`), false);
        }
        cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Upload files to a files storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Folder and files to upload',
    schema: {
      type: 'object',
      properties: {
        folder: { enum: Object.values(FileStoreFolders), type: 'string' },
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
    @UploadedFiles()
    files: Express.Multer.File[],
    @Body('folder', new ParseEnumPipe(FileStoreFolders)) folder: FileStoreFolders,
    @Req() req: any,
  ) {
    const user = req.user;
    const organizationName = user.organizationId;

    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    this.logger.log(`Uploading files for organization: ${organizationName}`);

    try {
      const uploadResults = await this.fileStorageService.uploadMultipleFiles(organizationName, folder, files);

      this.logger.log(`${uploadResults.length} file(s) uploaded successfully`);

      return {
        message: `${uploadResults.length} file(s) uploaded successfully`,
        files: uploadResults,
      };
    } catch (error) {
      this.logger.error(`Error uploading files: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to upload files');
    }
  }

  /**
   * Delete a file by its key.
   * @param key - File key (path where the file is stored in storage).
   * @throws NotFoundException if the file is not found.
   * @throws InternalServerErrorException on server error.
   * @returns A success message.
   */
  @Delete()
  @ApiOperation({ summary: 'Delete a file by key' })
  @ApiQuery({ name: 'key', required: true, description: 'File key to delete' })
  @ApiResponse({ status: 200, description: 'File deleted successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  @ApiResponse({ status: 500, description: 'Error occurred while deleting file' })
  async deleteFile(@Query('key') key: string) {
    this.logger.log(`Deleting file with key: ${key}`);

    try {
      const result = await this.fileStorageService.deleteFile(key);
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
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Delete all files in a specified folder.
   * @param folder - Folder name from FileStoreFolders enum.
   * @param req - Request object to obtain user's organization info.
   * @throws BadRequestException if folder is empty or invalid.
   * @throws InternalServerErrorException on server error.
   * @returns A success message indicating folder deletion.
   */
  @Delete('folder')
  @ApiOperation({ summary: 'Delete all files in a folder' })
  @ApiQuery({
    name: 'folder',
    required: true,
    description: 'Folder name to delete (all files inside will be removed)',
  })
  @ApiResponse({ status: 200, description: 'Folder deleted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid folder' })
  @ApiResponse({ status: 500, description: 'Error occurred while deleting folder' })
  async deleteFolder(@Query('folder', new ParseEnumPipe(FileStoreFolders)) folder: FileStoreFolders, @Req() req: any) {
    const user = req.user;
    const organizationName = user.organizationId;

    this.logger.log(`Deleting folder: ${folder}`);

    try {
      const result = await this.fileStorageService.deleteFolder(organizationName, folder);

      if (!result) {
        throw new BadRequestException('Folder is empty or invalid');
      }

      return {
        message: 'Folder deleted successfully',
      };
    } catch (error) {
      this.logger.error(`Error deleting folder ${folder}: ${error.message}.`);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete folder');
    }
  }
}
