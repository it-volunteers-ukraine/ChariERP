import { Readable } from 'stream';
import { BucketFolders } from '../schemas/enums';
import { S3BucketService } from './s3-bucket.service';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';

jest.mock('@aws-sdk/client-s3');

describe('S3BucketService', () => {
  let service: S3BucketService;
  let mockSend: jest.Mock;

  beforeEach(() => {
    service = new S3BucketService();

    mockSend = jest.fn();
    (service as any).s3Client.send = mockSend;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadFile', () => {
    it('should upload file and return key', async () => {
      mockSend.mockResolvedValueOnce({});

      const file = { buffer: Buffer.from(''), originalname: 'file.txt' };
      const key = await service.uploadFile('org', BucketFolders.Task, file);

      expect(key).toBe(`${encodeURIComponent('org')}/${BucketFolders.Task}/file.txt`);
      expect(mockSend).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      const file = { buffer: Buffer.from(''), originalname: 'file.txt' };
      await expect(service.uploadFile('org', BucketFolders.Task, file)).rejects.toThrow(
        'Error uploading a file to the server',
      );
    });
  });

  describe('uploadMultipleFiles', () => {
    it('should upload multiple files successfully', async () => {
      const files = [
        { buffer: Buffer.from(''), originalname: 'file1.txt' } as any,
        { buffer: Buffer.from(''), originalname: 'file2.txt' } as any,
      ];
      mockSend.mockResolvedValue({});

      const result = await service.uploadMultipleFiles('org', BucketFolders.Task, files);

      expect(result).toHaveLength(2);
      expect(result[0]).toBe(`${encodeURIComponent('org')}/${BucketFolders.Task}/file1.txt`);
      expect(mockSend).toHaveBeenCalledTimes(2);
    });

    it('should throw BadRequestException if no files provided', async () => {
      await expect(service.uploadMultipleFiles('org', BucketFolders.Task, null as any)).rejects.toThrow(
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

      await expect(service.downloadFile('some-key')).rejects.toThrow('Error downloading a file from the server');
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

      await expect(service.deleteFile('key')).rejects.toThrow('Error deleting a file from the server');
    });
  });

  describe('deleteFolder', () => {
    const deleteFolderArgs = { folder: BucketFolders.Task, organizationName: 'org' };

    it('should return true if folder is empty', async () => {
      mockSend.mockResolvedValueOnce({ Contents: [] });

      const result = await service.deleteFolder(deleteFolderArgs);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should delete all files and return true', async () => {
      mockSend
        .mockResolvedValueOnce({ Contents: [{ Key: 'file1' }, { Key: 'file2' }] }) // ListObjectsCommand
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await service.deleteFolder(deleteFolderArgs);

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(3);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      await expect(service.deleteFolder(deleteFolderArgs)).rejects.toThrow('Error deleting a folder from the server');
    });
  });
});
