import { Schema, model, models } from 'mongoose';

import { IUsers, Roles, UserStatus } from '@/types';

const usersSchema = new Schema<IUsers>({
  avatarUrl: { type: String },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(Roles),
    default: Roles.USER,
  },
  DateOfBirth: Date,
  dateOfEntry: Date,
  address: String,
  notes: String,
  lastLogin: Date,
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organizations',
    required: true,
  },
});

export default models.Users || model<IUsers>('Users', usersSchema);
