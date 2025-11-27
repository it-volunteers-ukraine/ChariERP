import {
  PutObjectCommandInput,
  PutObjectCommand,
  GetObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsCommandInput,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectsCommandInput,
  DeleteObjectsCommand,
  DeleteObjectsCommandOutput,
  NoSuchKey,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { FileStoreFolders } from '@/schemas/enums';
import stream from 'node:stream';
import { ConfigService } from '@nestjs/config';
import { RetrievedFile } from './interfaces/retrieved-file.interface';
import { ObjectStorageService } from '@/s3/object-storage.service';
import { MulterFile } from '@/pipes/interfaces/file-validator.interface';

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);

  private readonly bucketName: string;
  private readonly envPrefix: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly s3: ObjectStorageService,
  ) {
    this.bucketName = this.configService.getOrThrow<string>('S3_BUCKET_ID');
    this.envPrefix = this.configService.get<string>('FILE_STORAGE_FOLDER', 'DEV');
  }

  private get fileClient() {
    return this.s3.client;
  }

  private buildKey(organizationId: string, folder: FileStoreFolders, fileName?: string): string {
    return `${this.envPrefix}/${encodeURIComponent(organizationId)}/${folder}/${fileName || ''}`;
  }

  private verifyFileAccess(key: string, organizationId: string): void {
    const encodedOrgId = encodeURIComponent(organizationId);

    const encodedOrgIdFromKey = key.split('/')[1];

    if (encodedOrgId !== encodedOrgIdFromKey) {
      this.logger.warn(
        `Unauthorized access attempt.
        User '${organizationId}' tried to access file '${key}' belonging to another organization.`,
      );
      throw new ForbiddenException('User is not allowed to access this file');
    }
  }

  private async uploadFile(organizationId: string, folder: FileStoreFolders, file: MulterFile): Promise<string> {
    const key = this.buildKey(organizationId, folder, file.originalname);

    const input: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ACL: 'private',
      ContentType: file.mimetype,
    };

    const putObjectCommand = new PutObjectCommand(input);

    try {
      await this.fileClient.send(putObjectCommand);
      this.logger.log(`File uploaded successfully: ${key}`);
      return key;
    } catch (error) {
      if (error instanceof S3ServiceException) {
        this.logger.error(`Error from S3 while uploading file to ${this.bucketName}.  ${error.name}: ${error.message}`);
      } else {
        this.logger.error(`Error uploading file '${file.originalname}'`, error);
      }

      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  async uploadFiles(organizationId: string, folder: FileStoreFolders, files: MulterFile[]): Promise<string[]> {
    this.logger.log(`Uploading ${files.length} file(s) for organization '${organizationId}'`);

    try {
      return await Promise.all(files.map((file) => this.uploadFile(organizationId, folder, file)));
    } catch (error) {
      this.logger.error(`Unexpected server error while uploading file(s) for organization '${organizationId}'`, error);
      throw new InternalServerErrorException('Failed to upload file(s)');
    }
  }

  async getFile(key: string, organizationId: string): Promise<RetrievedFile> {
    this.logger.log(`Retrieving file with the key: ${key}`);

    this.verifyFileAccess(key, organizationId);

    const input: GetObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };

    const getObjectCommand = new GetObjectCommand(input);

    try {
      const response: GetObjectCommandOutput = await this.fileClient.send(getObjectCommand);

      if (response.ContentLength === 0) {
        this.logger.warn(`File '${key}' is empty`);
      }

      this.logger.log(`File retrieved successfully: ${key}`);

      return {
        stream: response.Body as stream.Readable,
        contentType: response.ContentType ?? 'application/octet-stream',
        contentLength: response.ContentLength ?? 0,
      };
    } catch (error) {
      if (error instanceof NoSuchKey) {
        this.logger.error(`Error from S3 while getting file '${key}' from '${this.bucketName}'. No such key exists.`);
        throw new NotFoundException('File not found');
      } else if (error instanceof S3ServiceException) {
        this.logger.error(
          `Error from S3 while getting file '${key}' from '${this.bucketName}'. ${error.name}: ${error.message}`,
        );
      } else {
        this.logger.error(`Unexpected server error while retrieving file '${key}' from '${this.bucketName}'`, error);
      }

      throw new InternalServerErrorException('Failed to retrieve file');
    }
  }

  async deleteFile(key: string, organizationId: string): Promise<void> {
    this.logger.log(`Deleting file with the key: ${key}`);

    this.verifyFileAccess(key, organizationId);

    const input: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };

    const deleteObjectCommand = new DeleteObjectCommand(input);

    try {
      await this.fileClient.send(deleteObjectCommand);
      this.logger.log(
        `The file '${key}' from bucket '${this.bucketName}' was deleted successfully, or it didn't exist`,
      );
    } catch (error) {
      if (error instanceof S3ServiceException) {
        this.logger.error(
          `Error from S3 while deleting file from '${this.bucketName}'.  ${error.name}: ${error.message}`,
        );
      } else {
        this.logger.error(`Unexpected server error while deleting file '${key}'`, error);
      }

      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  private async listFiles(prefix: string, folder: FileStoreFolders): Promise<string[]> {
    const input: ListObjectsCommandInput = {
      Bucket: this.bucketName,
      Prefix: prefix,
    };

    const response: ListObjectsCommandOutput = await this.fileClient.send(new ListObjectsCommand(input));

    const { Contents } = response;

    if (!Contents || Contents.length === 0) {
      this.logger.warn(`No files found in the folder '${folder}'`);
      throw new BadRequestException('No files found in a folder');
    }

    const fileKeys = Contents.filter((item): item is { Key: string } => typeof item.Key === 'string').map(
      (item) => item.Key,
    );

    this.logger.log(
      `Found ${fileKeys.length} file(s) in the '${folder}':\n` + fileKeys.map((k) => ` - ${k}`).join('\n'),
    );

    return fileKeys;
  }

  async deleteFolder(organizationId: string, folder: FileStoreFolders): Promise<void> {
    this.logger.log(`Deleting all files from the folder '${folder}' for organization '${organizationId}'`);

    const prefix = this.buildKey(organizationId, folder);

    const fileKeys = await this.listFiles(prefix, folder);

    const input: DeleteObjectsCommandInput = {
      Bucket: this.bucketName,
      Delete: { Objects: fileKeys.map((key) => ({ Key: key })) },
    };

    const deleteObjectsCommand = new DeleteObjectsCommand(input);

    try {
      const { Deleted }: DeleteObjectsCommandOutput = await this.fileClient.send(deleteObjectsCommand);

      if (Deleted) {
        const deletedKeys = Deleted.filter((item) => item.Key).map((item) => item.Key);

        this.logger.log(
          `Successfully deleted ${deletedKeys.length} file(s) from the '${folder}':\n` +
            deletedKeys.map((key) => ` - ${key}`).join('\n'),
        );
      }
    } catch (error) {
      if (error instanceof S3ServiceException) {
        this.logger.error(
          `Error from S3 while deleting files within the folder '${folder}'` +
            `from '${this.bucketName}'. ${error.name}: ${error.message}`,
        );
      } else {
        this.logger.error(`Unexpected server error while deleting files within the folder '${folder}'`, error);
      }

      throw new InternalServerErrorException('Failed to delete files within a folder');
    }
  }
}
