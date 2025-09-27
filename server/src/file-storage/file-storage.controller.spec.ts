import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';
import { StreamableFile, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FileStoreFolders } from '../schemas/enums';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { FileStorageController } from './file-storage.controller';
import { FileStorageService } from './file-storage.service';

@Injectable()
class MockGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return true;
  }
}

describe('FileStorageController', () => {
  let controller: FileStorageController;
  let service: FileStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileStorageController],
      providers: [
        {
          provide: FileStorageService,
          useValue: {
            downloadFile: jest.fn(),
            uploadMultipleFiles: jest.fn(),
            deleteFile: jest.fn(),
            deleteFolder: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockGuard)
      .overrideGuard(RolesGuard)
      .useClass(MockGuard)
      .compile();

    controller = module.get<FileStorageController>(FileStorageController);
    service = module.get<FileStorageService>(FileStorageService);
  });

  describe('download', () => {
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockRes = {
        set: jest.fn(),
      };
    });

    it('should throw NotFoundException if file not found', async () => {
      jest.spyOn(service, 'downloadFile').mockRejectedValue(new NotFoundException());

      await expect(controller.download('some-key', mockRes as Response)).rejects.toThrow(NotFoundException);

      expect(service.downloadFile).toHaveBeenCalledWith('some-key');
      expect(mockRes.set).not.toHaveBeenCalled();
    });

    it('should return StreamableFile and set headers when file found with readable stream', async () => {
      const mockStream = new Readable();
      mockStream._read = () => {};

      const mockFile = {
        contentType: 'image/png',
        stream: mockStream,
      };
      jest.spyOn(service, 'downloadFile').mockResolvedValue(mockFile as any);

      const result = await controller.download('some-key/file.png', mockRes as Response);

      expect(service.downloadFile).toHaveBeenCalledWith('some-key/file.png');
      expect(mockRes.set).toHaveBeenCalledWith({
        'Content-Type': 'image/png',
        'Content-Disposition': expect.stringContaining('filename*=UTF-8'),
      });
      expect(result).toBeInstanceOf(StreamableFile);
      expect((result as StreamableFile)['stream']).toBe(mockStream);
    });

    it('should throw InternalServerErrorException on unknown error', async () => {
      jest.spyOn(service, 'downloadFile').mockRejectedValue(new Error('Some error'));

      await expect(controller.download('some-key/file.txt', mockRes as Response)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(service.downloadFile).toHaveBeenCalledWith('some-key/file.txt');
    });
  });

  describe('uploadFiles', () => {
    it('should throw BadRequestException if no files provided', async () => {
      await expect(
        controller.uploadFiles([], FileStoreFolders.Task, { user: { organizationId: 'org' } }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should upload files successfully', async () => {
      const files = [{} as Express.Multer.File];
      (service.uploadMultipleFiles as jest.Mock).mockResolvedValue(['org/tasks/file1']);

      const result = await controller.uploadFiles(files, FileStoreFolders.Task, { user: { organizationId: 'org' } });
      expect(service.uploadMultipleFiles).toHaveBeenCalledWith('org', FileStoreFolders.Task, files);
      expect(result).toEqual({
        message: '1 file(s) uploaded successfully',
        files: ['org/tasks/file1'],
      });
    });

    it('should throw InternalServerErrorException on upload error', async () => {
      const files = [{} as Express.Multer.File];
      (service.uploadMultipleFiles as jest.Mock).mockRejectedValue(new Error('Upload error'));

      await expect(
        controller.uploadFiles(files, FileStoreFolders.Task, { user: { organizationId: 'org' } }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteFile', () => {
    it('should delete file successfully', async () => {
      (service.deleteFile as jest.Mock).mockResolvedValue(true);

      const result = await controller.deleteFile('org/tasks/file1');
      expect(service.deleteFile).toHaveBeenCalledWith('org/tasks/file1');
      expect(result).toEqual({ message: 'File deleted successfully' });
    });

    it('should throw NotFoundException if file not found', async () => {
      (service.deleteFile as jest.Mock).mockResolvedValue(false);

      await expect(controller.deleteFile('org/tasks/missing')).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException on delete error', async () => {
      (service.deleteFile as jest.Mock).mockRejectedValue(new Error('Delete error'));

      await expect(controller.deleteFile('org/tasks/file1')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteFolder', () => {
    const req = { user: { organizationId: 'org' } };

    it('should delete folder successfully', async () => {
      (service.deleteFolder as jest.Mock).mockResolvedValue(true);

      const result = await controller.deleteFolder(FileStoreFolders.Task, req);

      expect(service.deleteFolder).toHaveBeenCalledWith('org', FileStoreFolders.Task);
      expect(result).toEqual({ message: 'Folder deleted successfully' });
    });

    it('should throw BadRequestException if invalid or empty folder', async () => {
      (service.deleteFolder as jest.Mock).mockResolvedValue(false);

      await expect(controller.deleteFolder(FileStoreFolders.Task, req)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on delete folder error', async () => {
      (service.deleteFolder as jest.Mock).mockRejectedValue(new Error('Delete folder error'));

      await expect(controller.deleteFolder(FileStoreFolders.Task, req)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
