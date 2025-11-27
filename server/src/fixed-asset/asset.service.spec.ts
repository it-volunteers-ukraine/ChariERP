import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { getModelToken } from '@nestjs/mongoose';
import { Asset } from '@/schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/constants/pagination.constants';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { SortOrder } from './enums/enums';
import { AssetQueryDto } from './dto/asset-query.dto';
import { UpdateAssetData } from './interfaces/asset.interfaces';

describe('AssetService', () => {
  let assetService: AssetService;
  let assetModel: any;

  beforeEach(async () => {
    const mockAssetModel = {
      countDocuments: jest.fn(),
      create: jest.fn(),
      paginate: jest.fn(),
      findOneAndUpdate: jest.fn().mockReturnThis(),
      findByIdAndDelete: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetService,
        {
          provide: getModelToken(Asset.name),
          useValue: mockAssetModel,
        },
      ],
    }).compile();

    assetService = module.get<AssetService>(AssetService);
    assetModel = module.get(getModelToken(Asset.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a fixed asset if it does not exist, with images when imageKeys are provided', async () => {
      assetModel.countDocuments.mockResolvedValue(0);

      const createAssetDto: CreateAssetDto = {
        name: faker.commerce.product(),
        location: faker.location.buildingNumber(),
        storageFloor: faker.string.numeric(),
      };

      const userId = faker.database.mongodbObjectId();
      const organizationId = faker.database.mongodbObjectId();

      const imagesKeys = [faker.image.url()];

      const mockCreatedAsset = {
        _id: faker.database.mongodbObjectId(),
        ...createAssetDto,
        images: imagesKeys,
        createdBy: userId,
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      assetModel.create.mockResolvedValue({
        toObject: () => mockCreatedAsset,
      });

      const result = await assetService.create(createAssetDto, userId, organizationId, imagesKeys);

      expect(assetModel.countDocuments).toHaveBeenCalledWith({ name: { $eq: createAssetDto.name } });
      expect(assetModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createAssetDto,
          images: imagesKeys,
          createdBy: userId,
          organizationId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
      expect(result).toEqual(mockCreatedAsset);
    });

    it('should create a fixed asset if it does not exist, without images when imagesKeys not provided', async () => {
      assetModel.countDocuments.mockResolvedValue(0);

      const createAssetDto: CreateAssetDto = {
        name: faker.commerce.product(),
        location: faker.location.buildingNumber(),
        storageFloor: faker.string.numeric(),
      };

      const userId = faker.database.mongodbObjectId();
      const organizationId = faker.database.mongodbObjectId();

      const mockCreatedAsset = {
        _id: faker.database.mongodbObjectId(),
        ...createAssetDto,
        createdBy: userId,
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      assetModel.create.mockResolvedValue({
        toObject: () => mockCreatedAsset,
      });

      const result = await assetService.create(createAssetDto, userId, organizationId);

      expect(assetModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createAssetDto,
          createdBy: userId,
          organizationId,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );

      expect(result).toEqual(mockCreatedAsset);
    });

    it('should throw ConflictException if fixed asset with same name exists', async () => {
      assetModel.countDocuments.mockResolvedValue(1);

      const dto: CreateAssetDto = { name: 'Duplicate name' };
      const userId = faker.database.mongodbObjectId();
      const organizationId = faker.database.mongodbObjectId();

      await expect(assetService.create(dto, userId, organizationId)).rejects.toThrow(ConflictException);

      expect(assetModel.countDocuments).toHaveBeenCalledWith({ name: { $eq: dto.name } });
    });
  });

  describe('findAll', () => {
    it('should return paginated fixed assets (with filter and sorting)', async () => {
      const organizationId = faker.database.mongodbObjectId();

      const mockQuery: AssetQueryDto = {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        name: SortOrder.Ascending,
        hasImage: true,
      };

      const mockFilter = {
        organizationId: { $eq: organizationId },
        images: { $exists: true },
      };

      const mockSort = {
        name: SortOrder.Ascending,
      };

      const createdAt = faker.date.past();

      const mockAssets = Array.from({ length: DEFAULT_LIMIT }, () => ({
        _id: faker.database.mongodbObjectId(),
        organizationId,
        name: faker.commerce.product(),
        location: faker.location.buildingNumber(),
        storageFloor: faker.string.numeric(),
        createdBy: faker.database.mongodbObjectId(),
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      }));

      const totalDocs = faker.number.int({ min: 1 });

      const mockPaginateResult = {
        docs: mockAssets,
        totalDocs,
        limit: DEFAULT_LIMIT,
        page: DEFAULT_PAGE,
        totalPages: Math.ceil(totalDocs / DEFAULT_LIMIT),
      };

      assetModel.paginate.mockResolvedValue(mockPaginateResult);

      const result = await assetService.findAll(organizationId, mockQuery);

      expect(assetModel.paginate).toHaveBeenCalledWith(mockFilter, {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        sort: mockSort,
        lean: true,
        leanWithId: false,
      });

      expect(result).toEqual({
        assets: mockAssets,
        totalDocs,
        perPage: DEFAULT_LIMIT,
        currentPage: DEFAULT_PAGE,
        totalPages: Math.ceil(totalDocs / DEFAULT_LIMIT),
      });
    });

    it('should throw NotFoundException if fixed assets not found in organization', async () => {
      const organizationId = faker.database.mongodbObjectId();

      const mockQuery: AssetQueryDto = {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        name: SortOrder.Ascending,
        hasImage: true,
      };

      const mockFilter = {
        organizationId: { $eq: organizationId },
        images: { $exists: true },
      };

      const mockSort = {
        name: SortOrder.Ascending,
      };

      const mockAssets = [];
      const totalDocs = 0;

      const mockPaginateResult = {
        docs: mockAssets,
        totalDocs,
        limit: DEFAULT_LIMIT,
        page: DEFAULT_PAGE,
        totalPages: 1,
      };

      assetModel.paginate.mockResolvedValue(mockPaginateResult);

      await expect(assetService.findAll(organizationId, mockQuery)).rejects.toThrow(NotFoundException);

      expect(assetModel.paginate).toHaveBeenCalledWith(mockFilter, {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        sort: mockSort,
        lean: true,
        leanWithId: false,
      });
    });
  });

  describe('update', () => {
    it('should update a fixed asset with images if provided and return updated doc', async () => {
      const name = faker.commerce.product();

      const updateAssetDto: UpdateAssetDto = {
        name,
      };

      const assetId = faker.database.mongodbObjectId();

      const imagesKeys = [faker.image.url()];

      const updateData: UpdateAssetData = {
        name,
        images: imagesKeys,
      };

      const mockUpdatedAsset = {
        _id: assetId,
        organizationId: faker.database.mongodbObjectId(),
        ...updateData,
        createdBy: faker.database.mongodbObjectId(),
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      };

      assetModel.exec.mockResolvedValue(mockUpdatedAsset);

      const result = await assetService.update(updateAssetDto, assetId, imagesKeys);

      expect(assetModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: { $eq: assetId } },
        { $set: updateData, $currentDate: { updatedAt: true } },
        { lean: true, new: true },
      );

      expect(assetModel.exec).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedAsset);
    });

    it('should update a fixed asset without images if not provided and return updated doc', async () => {
      const name = faker.commerce.product();

      const updateAssetDto: UpdateAssetDto = {
        name,
      };

      const assetId = faker.database.mongodbObjectId();

      const updateData: UpdateAssetData = {
        name,
      };

      const mockUpdatedAsset = {
        _id: assetId,
        organizationId: faker.database.mongodbObjectId(),
        ...updateData,
        createdBy: faker.database.mongodbObjectId(),
        createdAt: faker.date.past(),
        updatedAt: new Date(),
      };

      assetModel.exec.mockResolvedValue(mockUpdatedAsset);

      const result = await assetService.update(updateAssetDto, assetId);

      expect(assetModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: { $eq: assetId } },
        { $set: updateData, $currentDate: { updatedAt: true } },
        { lean: true, new: true },
      );

      expect(assetModel.exec).toHaveBeenCalled();
      expect(result).toEqual(mockUpdatedAsset);
    });

    it('should throw NotFoundException if fixed asset not found', async () => {
      const updateAssetDto: UpdateAssetDto = {
        name: faker.commerce.productName(),
      };

      const assetId = faker.database.mongodbObjectId();

      assetModel.exec.mockResolvedValue(null);

      await expect(assetService.update(updateAssetDto, assetId)).rejects.toThrow(NotFoundException);

      expect(assetModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: { $eq: assetId } },
        { $set: updateAssetDto, $currentDate: { updatedAt: true } },
        { lean: true, new: true },
      );

      expect(assetModel.exec).toHaveBeenCalled();
    });
  });

  describe('deleteOne', () => {
    it('should delete fixed asset by id', async () => {
      const assetId = faker.database.mongodbObjectId();

      const mockDeletedAsset = { _id: assetId };

      assetModel.exec.mockResolvedValue(mockDeletedAsset);

      const result = await assetService.deleteOne(assetId);

      expect(assetModel.findByIdAndDelete).toHaveBeenCalledWith(assetId);
      expect(assetModel.lean).toHaveBeenCalled();
      expect(assetModel.exec).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if fixed asset not found', async () => {
      const assetId = faker.database.mongodbObjectId();

      assetModel.exec.mockResolvedValue(null);

      await expect(assetService.deleteOne(assetId)).rejects.toThrow(NotFoundException);

      expect(assetModel.findByIdAndDelete).toHaveBeenCalledWith(assetId);
      expect(assetModel.exec).toHaveBeenCalled();
    });
  });
});
