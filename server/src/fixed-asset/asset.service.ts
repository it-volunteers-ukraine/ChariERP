import { PaginateModel, PaginateResult } from 'mongoose';
import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '@/schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { SortOrder, ValueRange } from './enums/enums';
import { AssetQueryDto } from './dto/asset-query.dto';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination.constants';
import { Filter } from './interfaces/filter.interface';
import { AssetDoc, UpdateAssetData } from './interfaces/asset.interfaces';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: PaginateModel<AssetDocument>) {}

  async create(
    createAssetDto: CreateAssetDto,
    userId: string,
    organizationId: string,
    imagesKeys?: string[],
  ): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel.countDocuments({ name: { $eq: name } });

    if (existing) {
      this.logger.warn(`Fixed asset with name '${name}' already exists`);
      throw new ConflictException('Fixed asset with current name already exists');
    }

    const assetDoc: AssetDoc = {
      ...createAssetDto,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (imagesKeys && imagesKeys.length > 0) {
      assetDoc.images = imagesKeys;
    }

    const createdAsset = await this.assetModel.create(assetDoc);

    this.logger.log(`Fixed asset '${name}' (ID: ${createdAsset.id}) successfully created by user '${userId}'`);

    return createdAsset.toObject();
  }

  private buildFilter(organizationId: string, query: AssetQueryDto): Filter {
    const { category, location, hasImage, valueRange } = query;

    const filter: Filter = {
      organizationId: { $eq: organizationId },
    };

    if (category) filter.category = category;
    if (location) filter.location = location;

    if (hasImage === true) {
      filter.images = { $exists: hasImage };
    }

    if (hasImage === false) {
      filter.images = { $exists: hasImage };
    }

    switch (valueRange) {
      case ValueRange.LT_1000:
        filter.value = { $lt: 1000 };
        break;

      case ValueRange.BETWEEN_1000_2000:
        filter.value = { $gte: 1000, $lte: 2000 };
        break;

      case ValueRange.GT_2000:
        filter.value = { $gt: 2000 };
        break;
    }

    return filter;
  }

  private buildSort(query: AssetQueryDto): Record<string, SortOrder> {
    const sort: Record<string, SortOrder> = {};

    if (query.name) sort.name = query.name;
    if (query.value) sort.value = query.value;

    return sort;
  }

  async findAll(
    organizationId: string,
    query: AssetQueryDto,
  ): Promise<{ assets: Asset[]; totalDocs: number; perPage: number; currentPage: number; totalPages: number }> {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = query;

    const filter = this.buildFilter(organizationId, query);
    const sort = this.buildSort(query);

    const result: PaginateResult<Asset> = await this.assetModel.paginate(filter, {
      page,
      limit,
      sort,
      lean: true,
      leanWithId: false,
    });

    if (!result.totalDocs) {
      this.logger.warn(`No fixed assets found in organization '${organizationId}'`);
      throw new NotFoundException('No fixed assets found in organization');
    }

    return {
      assets: result.docs,
      totalDocs: result.totalDocs,
      perPage: result.limit,
      currentPage: result.page ?? page,
      totalPages: result.totalPages,
    };
  }

  async update(updateAssetDto: UpdateAssetDto, assetId: string, imagesKeys?: string[]): Promise<Asset> {
    const updateData: UpdateAssetData = {
      ...updateAssetDto,
    };

    if (imagesKeys && imagesKeys.length > 0) {
      updateData.images = imagesKeys;
    }

    const updatedAsset = await this.assetModel
      .findOneAndUpdate(
        { _id: { $eq: assetId } },
        { $set: updateData, $currentDate: { updatedAt: true } },
        { lean: true, new: true },
      )
      .exec();

    if (!updatedAsset) {
      this.logger.error(`Fixed asset with ID '${assetId}' not found`);
      throw new NotFoundException('Fixed asset not found');
    }

    this.logger.log(`Fixed asset '${assetId}' successfully updated`);

    return updatedAsset;
  }

  async deleteOne(assetId: string): Promise<void> {
    const deletedAsset = await this.assetModel.findByIdAndDelete(assetId).lean().exec();

    if (!deletedAsset) {
      this.logger.error(`Fixed asset with ID '${assetId}' not found`);
      throw new NotFoundException('Fixed asset not found');
    }

    this.logger.log(`Fixed asset '${assetId}' successfully deleted`);
  }
}
