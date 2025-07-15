import { Test, TestingModule } from '@nestjs/testing';
import { S3BucketController } from './s3-bucket.controller';
import { S3BucketService } from './s3-bucket.service';
import { Response } from 'express';
import { Readable } from 'stream';

describe('S3BucketController', () => {
  let controller: S3BucketController;
  let service: S3BucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3BucketController],
      providers: [
        {
          provide: S3BucketService,
          useValue: {
            downloadFile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<S3BucketController>(S3BucketController);
    service = module.get<S3BucketService>(S3BucketService);
  });

  describe('download', () => {
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        set: jest.fn(),
      };
    });

    it('should return 404 if file not found', async () => {
      jest.spyOn(service, 'downloadFile').mockResolvedValue(null as any);

      await controller.download({ key: 'some-key' }, mockRes as Response);

      expect(service.downloadFile).toHaveBeenCalledWith('some-key');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith('File not found');
    });

    it('should stream file if Body is Readable', async () => {
      const mockStream = new Readable();
      mockStream._read = () => {};

      const mockFile = {
        ContentType: 'image/png',
        Body: mockStream,
      };
      jest.spyOn(service, 'downloadFile').mockResolvedValue(mockFile as any);

      mockStream.pipe = jest.fn();

      await controller.download({ key: 'some-key/file.png' }, mockRes as Response);

      expect(service.downloadFile).toHaveBeenCalledWith('some-key/file.png');
      expect(mockRes.set).toHaveBeenCalledWith({
        'Content-Type': 'image/png',
        'Content-Disposition': expect.stringContaining('filename*=UTF-8'),
      });
      expect(mockStream.pipe).toHaveBeenCalledWith(mockRes);
    });

    it('should return 500 if Body is not Readable', async () => {
      const mockFile = {
        ContentType: 'text/plain',
        Body: {},
      };
      jest.spyOn(service, 'downloadFile').mockResolvedValue(mockFile as any);

      await controller.download({ key: 'some-key/file.txt' }, mockRes as Response);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith('Cannot stream this file type');
    });
  });
});
