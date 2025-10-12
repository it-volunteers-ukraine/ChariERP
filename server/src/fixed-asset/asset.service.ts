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

    const existing = await this.assetModel.countDocuments({ name: { $eq: name } });

    if (existing) {
      this.logger.warn(`Fixed asset with name '${name}' already exists`);
      throw new ConflictException('Fixed asset with current name already exists');
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

  async update(updateAssetDto: UpdateAssetDto, assetId: string): Promise<Asset> {
    const updatedAsset = await this.assetModel
      .findOneAndUpdate(
        { _id: { $eq: assetId } },
        { $set: updateAssetDto, $currentDate: { updatedAt: true } },
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
