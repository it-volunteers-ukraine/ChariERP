import { Response } from 'express';
import { FileStoreFolders, Roles } from '@/schemas/enums';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserRoles } from '@/auth/roles.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiHeader,
  ApiBody,
  ApiQuery,
  ApiOkResponse,
  ApiAcceptedResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import {
  Get,
  Req,
  Res,
  Post,
  Body,
  Query,
  Delete,
  Controller,
  UploadedFiles,
  StreamableFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { AuthenticatedRequest } from '@/auth/interfaces/authenticated-request.interface';
import { FileValidationPipe } from '@/pipes/file-validation.pipe';
import { FolderValidationPipe } from '@/pipes/folder-validation.pipe';
import { UploadFilesResponse } from './dto/upload-files-response';
import { MulterFile } from '@/pipes/interfaces/file-validator.interface';

@ApiTags('File')
@Controller('files')
@UserRoles(Roles.MANAGER)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', description: 'Bearer token' })
@ApiUnauthorizedResponse({ description: 'Invalid credentials' })
@ApiForbiddenResponse({ description: 'User role does not have access to this resource' })
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({ summary: 'Upload file(s) in storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Folder and file(s) to upload',
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
  @ApiAcceptedResponse({
    description: 'File(s) uploaded successfully',
    type: UploadFilesResponse,
  })
  @ApiBadRequestResponse({ description: 'Invalid file' })
  @ApiInternalServerErrorResponse({ description: 'Failed to upload file(s)' })
  async uploadFiles(
    @UploadedFiles(FileValidationPipe) files: MulterFile[],
    @Body('folder', FolderValidationPipe) folder: FileStoreFolders,
    @Req() req: AuthenticatedRequest,
  ): Promise<UploadFilesResponse> {
    const { organizationId } = req.user;

    const createdFiles = await this.fileStorageService.uploadFiles(organizationId, folder, files);

    return {
      message: `${createdFiles.length} file(s) uploaded successfully`,
      files: createdFiles,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get file by key from storage' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'Key of the file to get',
  })
  @ApiOkResponse({ description: 'File retrieved successfully. Returns streamable file' })
  @ApiNotFoundResponse({ description: 'File not found' })
  @ApiInternalServerErrorResponse({ description: 'Failed to retrieve file' })
  async getFile(@Query('key') key: string, @Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    const file = await this.fileStorageService.getFile(key);

    const { stream, contentType, contentLength } = file;

    const filename = encodeURIComponent(key.split('/').pop() || 'file');

    res.set({
      'Content-Type': contentType,
      'Content-Length': contentLength.toString(),
      'Content-Disposition': `attachment; filename*=UTF-8''${filename}`,
    });

    return new StreamableFile(stream);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete file by key from storage' })
  @ApiQuery({ name: 'key', required: true, description: 'Key name of the file to delete' })
  @ApiNoContentResponse({ description: 'File deleted successfully, or it did not exist' })
  @ApiInternalServerErrorResponse({ description: 'Failed to delete file' })
  async deleteFile(@Query('key') key: string): Promise<void> {
    await this.fileStorageService.deleteFile(key);
  }

  @Delete('folder')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete all files within a folder (prefix) from storage' })
  @ApiQuery({
    name: 'folder',
    required: true,
    description: 'Name of the folder (prefix) whose contents will be deleted',
  })
  @ApiNoContentResponse({ description: 'All files within a folder deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid folder name' })
  @ApiNotFoundResponse({ description: 'No files found in a folder' })
  @ApiInternalServerErrorResponse({ description: 'Failed to delete files within a folder' })
  async deleteFolder(
    @Query('folder', FolderValidationPipe) folder: FileStoreFolders,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    const { organizationId } = req.user;

    await this.fileStorageService.deleteFolder(organizationId, folder);
  }
}
