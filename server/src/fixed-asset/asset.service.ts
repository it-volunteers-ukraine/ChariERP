import { Model } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset, AssetDocument } from '../schemas/asset.schema';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetService {
  constructor(@InjectModel(Asset.name) private assetModel: Model<AssetDocument>) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const { name } = createAssetDto;

    const existing = await this.assetModel.findOne({ name }).lean().exec();

    if (existing) {
      throw new ConflictException('Asset with this name already exists');
    }

    // TO DO 
    const createdBy = '67eaba1a60eb693f37977d88';

    const createdAsset = await this.assetModel.create({
      ...createAssetDto,
      createdBy,
    });

    return createdAsset.toObject();
  }
}