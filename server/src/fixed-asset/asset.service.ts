import { Model } from 'mongoose';
import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { User } from '../schemas/user.schema';
import { CreateAssetDto } from './dto/create-asset.dto';
import { PaginationqQuery } from './interfaces/pagination-query.interface';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: Model<AssetDocument>, @InjectModel(User.name) private userModel: Model<User>) {}

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
      throw new NotFoundException('No fixed assets found for this user in the organization');
    }

    return { total, assets };
  }

  async update(updateAssetDto: Partial<CreateAssetDto>, assetId: string): Promise<Asset> {

    Object.keys(updateAssetDto).forEach(key => {
      if (
        updateAssetDto[key] === null ||
        updateAssetDto[key] === undefined 
      ) {
        delete updateAssetDto[key];
      }
    });

    const updatedAsset = await this.assetModel
    .findOneAndUpdate(
      { _id: { $eq: assetId } },
      { $set:  updateAssetDto, $currentDate: { updatedAt: true } },
      { lean: true, new: true })
    .exec();

    if(!updatedAsset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }

    this.logger.log(`Fixed asset '${assetId}' successfully updated`);

    return updatedAsset;
  }

  async deleteOne(assetId: string): Promise<void> {
    await this.assetModel.deleteOne({ _id: { $eq: assetId }} );

    this.logger.log(`Fixed asset '${assetId}' successfully deleted`);
  }
}