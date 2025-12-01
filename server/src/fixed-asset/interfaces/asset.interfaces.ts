import { CreateAssetDto } from '../dto/create-asset.dto';
import { UpdateAssetDto } from '../dto/update-asset.dto';
import { Types } from 'mongoose';

export interface Asset {
  name: string;
  location?: string;
  storageFloor?: string;
  category?: string;
  origin?: string;
  financing?: string;
  dateReceived?: Date;
  value?: number;
  currency?: string;
  unit?: string;
  description?: string;
}

export interface AssetDoc extends CreateAssetDto {
  createdBy: Types.ObjectId;
  organizationId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  images?: string[];
}

export interface UpdateAssetData extends UpdateAssetDto {
  images?: string[];
}
