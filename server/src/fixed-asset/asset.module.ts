import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { Asset, AssetSchema } from '../schemas/asset.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}