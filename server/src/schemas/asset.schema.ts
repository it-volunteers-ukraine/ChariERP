import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose'

export type AssetDocument = HydratedDocument<Asset>;

@Schema({ versionKey: false })
export class Asset {
  @Prop({ required: true, unique: true})
  name: string;
  @Prop()
  location?: string;
  @Prop()
  storageFloor?: string;
  @Prop()
  category?: string;
  @Prop()
  origin?: string;
  @Prop()
  financing?: string;
  @Prop()
  dateReceived?: string;
  @Prop()
  value?: number;
  @Prop()
  currency?: string;
  @Prop()
  unit?: string;
  @Prop()
  photo?: string; 
  @Prop()
  description?: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  })
  createdBy: mongoose.Types.ObjectId;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
  })
  organizationId: mongoose.Types.ObjectId;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt?: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);