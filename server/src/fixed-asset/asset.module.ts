import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { Asset, AssetSchema } from '../schemas/asset.schema';
import { PipesModule } from '../pipes/pipes.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]), PipesModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
