import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommandInput,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BucketFolders } from '../schemas/enums';

import { Readable } from 'stream';

interface UploadedFile {
  buffer: Buffer;
  originalname: string;
}

@Injectable()
export class S3BucketService {
  private readonly region = 'fra1';
  private readonly bucket = process.env.S3_BUCKET_ID!;
  private readonly endpoint = `https://${this.region}.digitaloceanspaces.com`;

  private readonly s3Client = new S3Client({
    region: this.region,
    endpoint: this.endpoint,
    forcePathStyle: false,
    credentials: {
      accessKeyId: process.env.SPACES_KEY!,
      secretAccessKey: process.env.SPACES_SECRET!,
    },
  });

  async prepareFileStream(downloadedFile: any): Promise<Readable> {
    const { Body } = downloadedFile;

    if (!Body) {
      throw new InternalServerErrorException('File body is empty or undefined');
    }

    if (Body instanceof Readable) {
      return Body;
    } else if (Buffer.isBuffer(Body)) {
      return Readable.from(Body);
    } else if (typeof Body.transformToByteArray === 'function') {
      const byteArray = await Body.transformToByteArray();
      return Readable.from(Buffer.from(byteArray));
    } else if (typeof Body.arrayBuffer === 'function') {
      const buffer = Buffer.from(await Body.arrayBuffer());
      return Readable.from(buffer);
    } else {
      throw new InternalServerErrorException('Unsupported file body type');
    }
  }

  async uploadFile(organizationName: string, folder: BucketFolders, file: UploadedFile): Promise<string> {
    if (!Object.values(BucketFolders).includes(folder)) {
      throw new BadRequestException('Invalid folder');
    }

    const key = `${encodeURIComponent(organizationName)}/${folder}/${file.originalname}`;

    const params: PutObjectCommandInput = {
      Body: file.buffer,
      ACL: 'private',
      Key: key,
      Bucket: this.bucket,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));

      return key;
    } catch {
      throw new InternalServerErrorException('Error uploading a file to the server');
    }
  }

  async uploadMultipleFiles(
    organizationName: string,
    folder: BucketFolders,
    files: Express.Multer.File[] | Express.Multer.File,
  ): Promise<string[]> {
    if (!files) {
      throw new BadRequestException('No files provided');
    }

    const fileArray = Array.isArray(files) ? files : [files];

    const uploadResults = await Promise.all(
      fileArray.map(async (file) => {
        const uploadedKey = await this.uploadFile(organizationName, folder, file);
        return uploadedKey;
      }),
    );

    return uploadResults;
  }

  async downloadFile(fileName: string) {
    const params: GetObjectCommandInput = {
      Key: fileName,
      Bucket: this.bucket,
    };
    try {
      const file = await this.s3Client.send(new GetObjectCommand(params));

      return {
        stream: await this.prepareFileStream(file),
        contentType: file.ContentType,
      };
    } catch {
      throw new InternalServerErrorException('Error downloading a file from the server');
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    const params: DeleteObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
      return true;
    } catch {
      throw new InternalServerErrorException('Error deleting a file from the server');
    }
  }

  async deleteFolder({
    folder,
    organizationName,
  }: {
    folder: BucketFolders;
    organizationName: string;
  }): Promise<boolean> {
    try {
      const { Contents } = await this.s3Client.send(
        new ListObjectsCommand({
          Prefix: `${organizationName}/${folder}/`,
          Bucket: this.bucket,
        }),
      );

      if (!Contents) return true;

      const deletions = Contents.filter((item) => item.Key).map(({ Key }) =>
        this.s3Client.send(new DeleteObjectCommand({ Key: Key!, Bucket: this.bucket })),
      );

      await Promise.all(deletions);
      return true;
    } catch {
      throw new InternalServerErrorException('Error deleting a folder from the server');
    }
  }
}
