import { PaginateModel, PaginateResult } from 'mongoose';
import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: PaginateModel<AssetDocument>) {}

  async create(createAssetDto: CreateAssetDto, userId: string, organizationId: string): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel
      .findOne({ name: { $eq: name } })
      .lean()
      .exec();

    if (existing) {
      this.logger.warn(`Asset with name '${name}' already exists`);
      throw new ConflictException('Asset with this name already exists');
    }

    const createdAsset = await this.assetModel.create({
      ...createAssetDto,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.logger.log(`Fixed asset '${name}' (ID: ${createdAsset._id}) successfully created by user '${userId}'`);

    return createdAsset.toObject();
  }

  async findAll(
    organizationId: string,
    page: number,
    limit: number,
  ): Promise<{ assets: Asset[]; totalDocs: number; perPage: number; currentPage: number; totalPages: number }> {
    const filter = { organizationId: { $eq: organizationId } };

    const result: PaginateResult<Asset> = await this.assetModel.paginate(filter, {
      page,
      limit,
      lean: true,
    });

    return {
      assets: result.docs,
      totalDocs: result.totalDocs,
      perPage: result.limit,
      currentPage: result.page ?? page,
      totalPages: result.totalPages,
    };
  }

  async update(updateAssetDto: UpdateAssetDto, assetId: string): Promise<Asset> {
    const updatedAsset = await this.assetModel
      .findOneAndUpdate(
        { _id: { $eq: assetId } },
        { $set: updateAssetDto, $currentDate: { updatedAt: true } },
        { lean: true, new: true },
      )
      .exec();

    if (!updatedAsset) {
      this.logger.error(`Asset with ID '${assetId}' not found or update did not occur`);
      throw new NotFoundException(`Asset with ID '${assetId}' not found or update did not occur`);
    }

    this.logger.log(`Fixed asset '${assetId}' successfully updated`);

    return updatedAsset;
  }

  async deleteOne(assetId: string): Promise<void> {
    await this.assetModel.deleteOne({ _id: { $eq: assetId } });

    this.logger.log(`Fixed asset '${assetId}' successfully deleted`);
  }
}
