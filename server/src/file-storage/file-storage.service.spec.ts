import { Readable } from 'stream';
import { FileStoreFolders } from '../schemas/enums';
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { FileStorageService } from './file-storage.service';

jest.mock('@aws-sdk/client-s3');

describe('FileStorageService', () => {
  let service: FileStorageService;
  let mockSend: jest.Mock;

  const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: any) => {
      switch (key) {
        case 'S3_REGION':
          return 'fra1';
        case 'FILE_STORAGE_FOLDER':
          return 'DEV';
        default:
          return defaultValue;
      }
    }),
    getOrThrow: jest.fn((key: string) => {
      switch (key) {
        case 'S3_BUCKET_ID':
          return 'my-bucket';
        case 'SPACES_KEY':
          return 'access-key';
        case 'SPACES_SECRET':
          return 'secret-key';
        default:
          throw new Error(`Missing env var: ${key}`);
      }
    }),
  };

  beforeEach(() => {
    service = new FileStorageService(mockConfigService as any);

    (service as any).fileClient = { send: jest.fn() };
    mockSend = (service as any).fileClient.send;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockFile = (name: string): Express.Multer.File => ({
    fieldname: 'file',
    originalname: name,
    encoding: '7bit',
    mimetype: 'text/plain',
    size: 12,
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.from('dummy content'),
    stream: new Readable({
      read() {
        this.push(null);
      },
    }),
  });

  describe('uploadFile', () => {
    it('should upload file and return key', async () => {
      mockSend.mockResolvedValueOnce({});

      const file = createMockFile('file.txt');
      const key = await service.uploadFile('org', FileStoreFolders.Task, file);

      expect(key).toBe(`DEV/${encodeURIComponent('org')}/${FileStoreFolders.Task}/file.txt`);
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      const file = createMockFile('file.txt');
      await expect(service.uploadFile('org', FileStoreFolders.Task, file)).rejects.toThrow('Failed to upload file');
    });
  });

  describe('uploadMultipleFiles', () => {
    it('should upload multiple files successfully', async () => {
      const files = [createMockFile('file1.txt'), createMockFile('file2.txt')];
      mockSend.mockResolvedValue({});

      const result = await service.uploadMultipleFiles('org', FileStoreFolders.Task, files);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(`DEV/${encodeURIComponent('org')}/${FileStoreFolders.Task}/file1.txt`);
      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    it('should throw BadRequestException if no files provided', async () => {
      await expect(service.uploadMultipleFiles('org', FileStoreFolders.Task, null as any)).rejects.toThrow(
        'No files provided',
      );
    });
  });

  describe('downloadFile', () => {
    it('should return file and contentType on success', async () => {
      const mockFile: GetObjectCommandOutput = {
        Body: Readable.from(['some data']) as any,
        ContentType: 'text/plain',
        $metadata: {},
      };
      mockSend.mockResolvedValueOnce(mockFile);

      const file = await service.downloadFile('some-key');

      expect(file).toEqual({
        stream: expect.any(Readable),
        contentType: 'text/plain',
      });
      expect(mockSend).toHaveBeenCalledWith(expect.any(GetObjectCommand));
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      await expect(service.downloadFile('some-key')).rejects.toThrow('Failed to download file');
    });
  });

  describe('deleteFile', () => {
    it('should return true on success', async () => {
      mockSend.mockResolvedValueOnce({});

      const result = await service.deleteFile('key');
      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      await expect(service.deleteFile('key')).rejects.toThrow('Failed to delete file');
    });
  });

  describe('deleteFolder', () => {
    const organizationName = 'org';
    const folder = FileStoreFolders.Task;

    it('should return true if folder is empty', async () => {
      mockSend.mockResolvedValueOnce({ Contents: [] });

      const result = await service.deleteFolder(organizationName, folder);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(expect.any(ListObjectsCommand));
    });

    it('should delete all files and return true', async () => {
      mockSend
        .mockResolvedValueOnce({ Contents: [{ Key: 'file1' }, { Key: 'file2' }] }) // ListObjectsCommand
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await service.deleteFolder(organizationName, folder);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(3);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      await expect(service.deleteFolder(organizationName, folder)).rejects.toThrow('Failed to delete folder');
    });
  });
});
