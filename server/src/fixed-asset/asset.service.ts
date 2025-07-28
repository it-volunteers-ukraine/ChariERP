import { Model } from 'mongoose';
import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(@InjectModel(Asset.name) private assetModel: Model<AssetDocument>) {}

  async create(createAssetDto: CreateAssetDto, userId: string): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel.findOne({ name: { $eq: name } }).lean().exec();

    if (existing) {
      this.logger.warn(`Asset with name '${name}' already exists`)
      throw new ConflictException('Asset with this name already exists');
    }

    const createdAsset = await this.assetModel.create({
      ...createAssetDto,
      createdBy: userId,
    });

    this.logger.log(`Fixed asset '${name}' successfully created by user '${userId}'`)

    return createdAsset.toObject();
  }
}