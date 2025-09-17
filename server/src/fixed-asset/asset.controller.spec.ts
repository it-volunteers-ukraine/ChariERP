import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { faker } from '@faker-js/faker';
import { CreateAssetDto } from './dto/create-asset.dto';
import { AuthenticatedRequest } from './interfaces/authenticated-request.interface';
import { Roles } from '../schemas/enums';
import { plainToInstance } from 'class-transformer';
import { AssetResponseDto } from './dto/asset-response.dto';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '../constants/pagination.constants';
import { PaginatedAssetResponseDto } from './dto/paginated-asset-response.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

describe('AssetController', () => {
  let assetController: AssetController;
  let assetService: AssetService;
  let mockReq: Partial<AuthenticatedRequest>;

  beforeEach(async () => {
    const mockAssetService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [
        {
          provide: AssetService,
          useValue: mockAssetService,
        },
      ],
    }).compile();

    assetController = module.get<AssetController>(AssetController);
    assetService = module.get<AssetService>(AssetService);
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

  it('should be defined', () => {
    expect(assetController).toBeDefined();
  });

  describe('create', () => {
    it('should call assetService.create with correct arguments and return created fixed asset', async () => {
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

      const result = await assetController.create(createAssetDto, mockReq as AuthenticatedRequest);

      expect(assetService.create).toHaveBeenCalledWith(createAssetDto, userId, organizationId);

      expect(result).toEqual(plainToInstance(AssetResponseDto, mockCreatedAsset));
    });
  });

  describe('findAll', () => {
    it('should call assetService.findAll with correct arguments and return paginated fixed assets', async () => {
      mockReq.user!.role = Roles.USER;

      const organizationId = mockReq.user!.organizationId;

      const page = DEFAULT_PAGE;
      const limit = DEFAULT_LIMIT;
      const createdAt = faker.date.past();

      const mockAssets = Array.from({ length: limit }, () => ({
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
        perPage: limit,
        currentPage: page,
        totalPages: Math.ceil(totalDocs / limit),
      };

      (assetService.findAll as jest.Mock).mockResolvedValue(mockPaginateResult);

      const result = await assetController.findAll(page, limit, mockReq as AuthenticatedRequest);

      expect(assetService.findAll).toHaveBeenCalledWith(organizationId, page, limit);

      expect(result).toEqual(mockPaginateResult as PaginatedAssetResponseDto);
    });
  });

  describe('update', () => {
    it('should call assetService.update with correct arguments and return updated fixed asset', async () => {
      const updateAssetDto: UpdateAssetDto = {
        name: faker.commerce.product(),
      };

      const assetId = faker.database.mongodbObjectId();

      const mockUpdatedAsset = {
        _id: assetId,
        ...updateAssetDto,
        organizationId: mockReq.user!.organizationId,
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      };

      (assetService.update as jest.Mock).mockResolvedValue(mockUpdatedAsset);

      const result = await assetController.update(assetId, updateAssetDto);

      expect(assetService.update).toHaveBeenCalledWith(updateAssetDto, assetId);
      expect(result).toEqual(plainToInstance(AssetResponseDto, mockUpdatedAsset));
    });
  });

  describe('deleteOne', () => {
    it('should call assetService.deleteOne with correct id', async () => {
      const assetId = faker.database.mongodbObjectId();

      (assetService.deleteOne as jest.Mock).mockResolvedValue(undefined);

      const result = await assetController.deleteOne(assetId);

      expect(assetService.deleteOne).toHaveBeenCalledWith(assetId);
      expect(result).toBeUndefined();
    });
  });
});
