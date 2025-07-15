import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Roles, UserStatus } from './enums';

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop()
  middleName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  dateOfBirth: Date;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  address: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  notes: string;
  @Prop()
  avatarUrl?: string;
  @Prop()
  position: string;
  @Prop()
  dateOfEntry: Date;
  @Prop()
  lastLogin: Date;
  @Prop({
    type: String,
    required: true,
    enum: Object.values(Roles),
    default: Roles.USER,
  })
  role: Roles;
  @Prop({
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations',
  })
  organizationId: mongoose.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
