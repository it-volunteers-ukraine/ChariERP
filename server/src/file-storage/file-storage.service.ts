import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommandInput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { FileStoreFolders } from '../schemas/enums';
import { Readable } from 'stream';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorageService {
  private readonly bucket: string;
  private readonly region: string;
  private readonly endpoint: string;
  private readonly envPrefix: string;
  private readonly fileClient: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('S3_REGION', 'fra1');
    this.bucket = this.configService.getOrThrow<string>('S3_BUCKET_ID');
    this.endpoint = `https://${this.region}.digitaloceanspaces.com`;
    this.envPrefix = this.configService.get<string>('FILE_STORAGE_FOLDER') || 'DEV';

    this.fileClient = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      forcePathStyle: false,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('SPACES_KEY'),
        secretAccessKey: this.configService.getOrThrow<string>('SPACES_SECRET'),
      },
      maxAttempts: 2,
    });
  }

  private buildKey(organizationName: string, folder: FileStoreFolders, fileName?: string): string {
    return `${this.envPrefix}/${encodeURIComponent(organizationName)}/${folder}/${fileName || ''}`;
  }

  /**
   * Upload a single file.
   * @param organizationName - ID of the organisation to which the file belongs.
   * @param folder - Target folder enum.
   * @param file - File to upload (Multer file).
   * @throws BadRequestException if the file is empty.
   * @throws InternalServerErrorException if upload fails.
   * @returns The key of the uploaded file.
   */
  async uploadFile(organizationName: string, folder: FileStoreFolders, file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File is empty');
    }
    const key = this.buildKey(organizationName, folder, file.originalname);

    const contentType = file.mimetype || 'application/octet-stream';

    const params: PutObjectCommandInput = {
      Key: key,
      ACL: 'private',
      Body: file.buffer,
      Bucket: this.bucket,
      ContentType: contentType,
    };

    try {
      await this.fileClient.send(new PutObjectCommand(params));

      return key;
    } catch {
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  /**
   * Upload multiple files.
   * @param organizationName - ID of the organisation to which the files belong.
   * @param folder - Target folder enum.
   * @param files - Array of files or a single file.
   * @throws BadRequestException if no files provided.
   * @returns Array keys for the uploaded files.
   */
  async uploadMultipleFiles(
    organizationName: string,
    folder: FileStoreFolders,
    files: Express.Multer.File[] | Express.Multer.File,
  ): Promise<string[]> {
    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new BadRequestException('No files provided');
    }

    const fileArray = Array.isArray(files) ? files : [files];

    return Promise.all(
      fileArray.map((file) => {
        return this.uploadFile(organizationName, folder, file);
      }),
    );
  }

  /**
   * Download a file as a readable stream.
   * @param fileName - File key (path where the file is stored in storage).
   * @throws InternalServerErrorException if download fails or file missing.
   * @returns Object containing the Readable stream and content type.
   */
  async downloadFile(fileName: string) {
    const params: GetObjectCommandInput = {
      Key: fileName,
      Bucket: this.bucket,
    };
    try {
      const file = await this.fileClient.send(new GetObjectCommand(params));

      if (!file.Body) {
        throw new InternalServerErrorException('File is empty or missing');
      }

      return {
        stream: file.Body as Readable,
        contentType: file.ContentType || 'application/octet-stream',
      };
    } catch {
      throw new InternalServerErrorException('Failed to download file');
    }
  }

  /**
   * Delete a file by its key.
   * @param key - File key (path where the file is stored in storage).
   * @throws InternalServerErrorException if deletion fails.
   * @returns True when deletion is successful.
   */
  async deleteFile(key: string): Promise<boolean> {
    const params: DeleteObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
    };

    try {
      await this.fileClient.send(new DeleteObjectCommand(params));
      return true;
    } catch {
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Delete all files in a specified folder.
   * @param organizationName - ID of the organisation to which the folder belongs.
   * @param folder - Folder enum to delete files from.
   * @throws InternalServerErrorException if deletion fails.
   * @returns True when folder deletion is successful.
   */
  async deleteFolder(organizationName: string, folder: FileStoreFolders): Promise<boolean> {
    const prefix = this.buildKey(organizationName, folder);

    try {
      const { Contents } = await this.fileClient.send(
        new ListObjectsCommand({
          Prefix: prefix,
          Bucket: this.bucket,
        }),
      );

      if (!Contents) return true;

      const deletions = Contents.filter((item) => item.Key).map(({ Key }) =>
        this.fileClient.send(new DeleteObjectCommand({ Key: Key!, Bucket: this.bucket })),
      );

      await Promise.all(deletions);
      return true;
    } catch {
      throw new InternalServerErrorException('Failed to delete folder');
    }
  }
}
