import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { faker } from '@faker-js/faker';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AuthenticatedRequest } from '../auth/interfaces/authenticated-request.interface';
import { Roles } from '../schemas/enums';
import { plainToInstance } from 'class-transformer';
import { AssetResponse } from './dto/asset-response';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/pagination.constants';
import { PaginatedAssetResponse } from './dto/paginated-asset-response';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { FileStorageService } from '@/file-storage/file-storage.service';
import { FileStoreFolders } from '../schemas/enums';
import type { MulterFile } from '@/pipes/interfaces/file-validator.interface';

describe('AssetController', () => {
  let assetController: AssetController;
  let assetService: AssetService;
  let mockReq: Partial<AuthenticatedRequest>;
  let fileStorageService: FileStorageService;

  beforeEach(async () => {
    const mockAssetService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteOne: jest.fn(),
    };

    const mockFileStorageService = {
      uploadFiles: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
        {
          provide: FileStorageService,
          useValue: mockFileStorageService,
        },
      ],
    }).compile();

    assetController = module.get<AssetController>(AssetController);
    assetService = module.get<AssetService>(AssetService);
    fileStorageService = module.get<FileStorageService>(FileStorageService);

    mockReq = {
      user: {
        sub: faker.database.mongodbObjectId(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        avatar: faker.image.avatar(),
        lastLogin: faker.date.past().toString(),
        role: Roles.MANAGER,
        organizationId: faker.database.mongodbObjectId(),
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`create - without images:
    should call assetService.create with correct arguments and should not call fileStorageService.uploadFiles.
    Return created fixed asset`, async () => {
    const mockImages = [];

    const createAssetDto: CreateAssetDto = {
      name: faker.commerce.product(),
      location: faker.location.buildingNumber(),
      storageFloor: faker.string.numeric(),
    };

    const userId = mockReq.user!.sub;
    const organizationId = mockReq.user!.organizationId;

    const mockCreatedAsset = {
      _id: faker.database.mongodbObjectId(),
      ...createAssetDto,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (assetService.create as jest.Mock).mockResolvedValue(mockCreatedAsset);

    const result = await assetController.create(mockImages, createAssetDto, mockReq as AuthenticatedRequest);

    expect(fileStorageService.uploadFiles).not.toHaveBeenCalled();

    expect(assetService.create).toHaveBeenCalledWith(createAssetDto, userId, organizationId);

    expect(result).toEqual(plainToInstance(AssetResponse, mockCreatedAsset));
  });

  it(`create - with images:
    should call fileStorageService.uploadFiles and assetService.create with correct arguments.
    Return created fixed asset`, async () => {
    const mockImages: MulterFile[] = [
      {
        fieldname: 'images',
        originalname: faker.system.commonFileName('jpg'),
        encoding: '7bit',
        mimetype: faker.system.mimeType(),
        buffer: Buffer.from(faker.string.alphanumeric()),
        size: faker.number.int(),
      },
    ];

    const createAssetDto: CreateAssetDto = {
      name: faker.commerce.product(),
      location: faker.location.buildingNumber(),
      storageFloor: faker.string.numeric(),
    };

    const userId = mockReq.user!.sub;
    const organizationId = mockReq.user!.organizationId;

    const imagesKeys = [faker.image.url()];

    (fileStorageService.uploadFiles as jest.Mock).mockResolvedValue(imagesKeys);

    const mockCreatedAsset = {
      _id: faker.database.mongodbObjectId(),
      ...createAssetDto,
      images: imagesKeys,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (assetService.create as jest.Mock).mockResolvedValue(mockCreatedAsset);

    const result = await assetController.create(mockImages, createAssetDto, mockReq as AuthenticatedRequest);

    expect(fileStorageService.uploadFiles).toHaveBeenCalledWith(organizationId, FileStoreFolders.Assets, mockImages);

    expect(assetService.create).toHaveBeenCalledWith(createAssetDto, userId, organizationId, imagesKeys);

    expect(result).toEqual(plainToInstance(AssetResponse, mockCreatedAsset));
  });

  it('should call assetService.findAll with correct arguments and return paginated fixed assets', async () => {
    mockReq.user!.role = Roles.USER;

    const organizationId = mockReq.user!.organizationId;
    const createdAt = faker.date.past();

    const mockAssets = Array.from({ length: DEFAULT_LIMIT }, () => ({
      _id: faker.database.mongodbObjectId(),
      name: faker.commerce.product(),
      location: faker.location.buildingNumber(),
      storageFloor: faker.string.numeric(),
      organizationId,
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
    }));

    const totalDocs = faker.number.int({ min: 1 });

    const mockPaginateResult = {
      assets: mockAssets,
      totalDocs,
      perPage: DEFAULT_LIMIT,
      currentPage: DEFAULT_PAGE,
      totalPages: Math.ceil(totalDocs / DEFAULT_LIMIT),
    };

    (assetService.findAll as jest.Mock).mockResolvedValue(mockPaginateResult);

    const result = await assetController.findAll(DEFAULT_PAGE, DEFAULT_LIMIT, mockReq as AuthenticatedRequest);

    expect(assetService.findAll).toHaveBeenCalledWith(organizationId, DEFAULT_PAGE, DEFAULT_LIMIT);

    expect(result).toEqual(mockPaginateResult as PaginatedAssetResponse);
  });

  it(`update - without images:
    should call assetService.update with correct arguments and should not call fileStorageService.uploadFiles.
    Return updated fixed asset`, async () => {
    const mockImages = [];

    const updateAssetDto: UpdateAssetDto = {
      name: faker.commerce.product(),
    };

    const assetId = faker.database.mongodbObjectId();
    const organizationId = mockReq.user!.organizationId;

    const mockUpdatedAsset = {
      _id: assetId,
      ...updateAssetDto,
      organizationId,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    };

    (assetService.update as jest.Mock).mockResolvedValue(mockUpdatedAsset);

    const result = await assetController.update(mockImages, assetId, updateAssetDto, mockReq as AuthenticatedRequest);

    expect(fileStorageService.uploadFiles).not.toHaveBeenCalled();

    expect(assetService.update).toHaveBeenCalledWith(updateAssetDto, assetId);
    expect(result).toEqual(plainToInstance(AssetResponse, mockUpdatedAsset));
  });

  it(`update - with images:
    should call fileStorageService.uploadFiles and assetService.update with correct arguments.
    Return updated fixed asset`, async () => {
    const mockImages: MulterFile[] = [
      {
        fieldname: 'images',
        originalname: faker.system.commonFileName('jpg'),
        encoding: '7bit',
        mimetype: faker.system.mimeType(),
        buffer: Buffer.from(faker.string.alphanumeric()),
        size: faker.number.int(),
      },
    ];

    const updateAssetDto: UpdateAssetDto = {
      name: faker.commerce.product(),
    };

    const assetId = faker.database.mongodbObjectId();
    const organizationId = mockReq.user!.organizationId;

    const imagesKeys = [faker.image.url()];

    (fileStorageService.uploadFiles as jest.Mock).mockResolvedValue(imagesKeys);

    const mockUpdatedAsset = {
      _id: assetId,
      ...updateAssetDto,
      images: imagesKeys,
      organizationId,
      createdAt: faker.date.past(),
      updatedAt: new Date(),
    };

    (assetService.update as jest.Mock).mockResolvedValue(mockUpdatedAsset);

    const result = await assetController.update(mockImages, assetId, updateAssetDto, mockReq as AuthenticatedRequest);

    expect(fileStorageService.uploadFiles).toHaveBeenCalledWith(organizationId, FileStoreFolders.Assets, mockImages);

    expect(assetService.update).toHaveBeenCalledWith(updateAssetDto, assetId, imagesKeys);
    expect(result).toEqual(plainToInstance(AssetResponse, mockUpdatedAsset));
  });

  it('should call assetService.deleteOne with correct id', async () => {
    const assetId = faker.database.mongodbObjectId();

    (assetService.deleteOne as jest.Mock).mockResolvedValue(undefined);

    const result = await assetController.deleteOne(assetId);

    expect(assetService.deleteOne).toHaveBeenCalledWith(assetId);
    expect(result).toBeUndefined();
  });
});
