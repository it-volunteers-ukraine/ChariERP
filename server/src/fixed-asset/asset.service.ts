import { Model } from 'mongoose';
import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { User } from '../schemas/user.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { PaginationqQuery } from './interfaces/pagination-query.interface';
import { PaginatedAssetDto } from './dto/paginated-asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: Model<AssetDocument>, @InjectModel(User.name) private userModel: Model<User>) {}

  async create(createAssetDto: CreateAssetDto, userId: string): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel.findOne({ name: { $eq: name } }).lean().exec();

    if (existing) {
      this.logger.warn(`Asset with name '${name}' already exists`)
      throw new ConflictException('Asset with this name already exists');
    }

    const user = await this.userModel.findById(userId).lean().exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { organizationId } = user;

    const createdAsset = await this.assetModel.create({
      ...createAssetDto,
      createdBy: userId,
      organizationId,
      createdAt: new Date(),
    });

    this.logger.log(`Fixed asset '${name}' (ID: ${createdAsset._id}) successfully created by user '${userId}'`)

    return createdAsset.toObject();
  }

  async update(updateAssetDto: CreateAssetDto, assetId: string): Promise<Asset> {
    const updatedAsset = await this.assetModel
    .findByIdAndUpdate(
      assetId,
      { ...updateAssetDto, updatedAt: new Date() },
      { lean: true, new: true })
    .exec();

    if(!updatedAsset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    this.logger.log(`Fixed asset '${assetId}' successfully updated`);

    return updatedAsset;
  }

  async findAll(userId: string, query: PaginationqQuery): Promise<{total: number, assets: Asset[]}> {
    const page = query.page ? +query.page : 1;
    const limit = query.limit ? +query.limit : 5;
    const docsToSkip = (page - 1) * limit;

    const user = await this.userModel.findById(userId).lean().exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { organizationId } = user;

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
      throw new NotFoundException('No fixed assets found for this user in the organization');
    }

    return { total, assets };
  }

  async deleteOne(assetId: string): Promise<void> {
    await this.assetModel.deleteOne({ _id: { $eq: assetId }} );

    this.logger.log(`Fixed asset '${assetId}' successfully deleted`);
  }
}