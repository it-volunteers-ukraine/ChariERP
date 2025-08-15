import { Model } from 'mongoose';
import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { PaginationqQuery } from './interfaces/pagination-query.interface';
import { ASSET_ALLOWED_FIELDS } from '../constants/asset-fields';
import type { AssetAllowedField } from '../constants/asset-fields';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: Model<AssetDocument>) {}

  async create(createAssetDto: CreateAssetDto, userId: string, organizationId: string): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel.findOne({ name: { $eq: name } }).lean().exec();

    if (existing) {
      this.logger.warn(`Asset with name '${name}' already exists`)
      throw new ConflictException('Asset with this name already exists');
    }

    const createdAsset = await this.assetModel.create({
      ...createAssetDto,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
    });

    this.logger.log(`Fixed asset '${name}' (ID: ${createdAsset._id}) successfully created by user '${userId}'`)

    return createdAsset.toObject();
  }

  async findAll(organizationId: string, query: PaginationqQuery): Promise<{total: number, assets: Asset[]}> {
    const page = query.page ? +query.page : 1;
    const limit = query.limit ? +query.limit : 5;
    const docsToSkip = (page - 1) * limit;

    const filter = { organizationId: { $eq: organizationId } };

    const [ assets, total ] = await Promise.all([
      this.assetModel
        .find(filter)
        .skip(docsToSkip)
        .limit(limit)
        .lean()
        .exec(),
      this.assetModel.countDocuments(filter),
    ]);

    if (assets.length === 0) {
      this.logger.error('No fixed assets found for this user in the organization');
      throw new NotFoundException('No fixed assets found for this user in the organization');
    }

    return { total, assets };
  }

  async update(updateAssetDto: Partial<CreateAssetDto>, assetId: string): Promise<Asset> {
    const sanitazeUpdate: Partial<Record<AssetAllowedField, CreateAssetDto[AssetAllowedField]>> = {};

    for (const key of ASSET_ALLOWED_FIELDS) {
      if (
        Object.prototype.hasOwnProperty.call(updateAssetDto, key) &&
        updateAssetDto[key] !== null &&
        updateAssetDto[key] !== undefined
      ) {
        sanitazeUpdate[key] = updateAssetDto[key];
      }
    }

    const updatedAsset = await this.assetModel
    .findOneAndUpdate(
      { _id: { $eq: assetId } },
      { $set:  sanitazeUpdate, $currentDate: { updatedAt: true } },
      { lean: true, new: true })
    .exec();

    if (!updatedAsset) {
      this.logger.error(`Asset with ID '${assetId}' not found or update did not occur`);
      throw new NotFoundException(`Asset with ID '${assetId}' not found or update did not occur`);
    }

    this.logger.log(`Fixed asset '${assetId}' successfully updated`);

    return updatedAsset;
  }

  async deleteOne(assetId: string): Promise<void> {
    await this.assetModel.deleteOne({ _id: { $eq: assetId }} );

    this.logger.log(`Fixed asset '${assetId}' successfully deleted`);
  }
}