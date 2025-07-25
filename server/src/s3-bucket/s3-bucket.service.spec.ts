import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { S3BucketService } from './s3-bucket.service';
import { BucketFolders } from './bucket-folders.enum';
import { Readable } from 'stream';

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
      mockSend.mockResolvedValueOnce({}); // Відповідь AWS не важлива

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

  describe('downloadFile', () => {
    it('should return file on success', async () => {
      const mockFile: GetObjectCommandOutput = {
        Body: Readable.from(['some data']) as any,
        ContentType: 'text/plain',
        $metadata: {},
      };
      mockSend.mockResolvedValueOnce(mockFile);

      const file = await service.downloadFile('some-key');

      expect(file).toEqual(mockFile);
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
    it('should return true if folder is empty', async () => {
      mockSend.mockResolvedValueOnce({ Contents: [] });

      const result = await service.deleteFolder('empty-folder');

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(1);
    });

    it('should delete all files and return true', async () => {
      mockSend
        .mockResolvedValueOnce({ Contents: [{ Key: 'file1' }, { Key: 'file2' }] })
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});

      const result = await service.deleteFolder('folder');

      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledTimes(3);
    });

    it('should throw InternalServerErrorException on error', async () => {
      mockSend.mockRejectedValueOnce(new Error('Fail'));

      await expect(service.deleteFolder('folder')).rejects.toThrow('Error deleting a folder from the server');
    });
  });
});
