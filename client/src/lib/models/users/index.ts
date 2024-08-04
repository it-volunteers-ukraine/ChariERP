import { Schema, model, models } from 'mongoose';

import { Roles, UserStatus } from '@/types';

interface IUsers {
  role: Roles;
  phone: number;
  notes: string;
  email: string;
  address: string;
  lastLogin: Date;
  lastName: string;
  position: string;
  password: string;
  firstName: string;
  DateOfBirth: Date;
  dateOfEntry: Date;
  middleName: string;
  status: UserStatus;
  _id?: Schema.Types.ObjectId;
  organizationId: Schema.Types.ObjectId;
}

const usersSchema = new Schema<IUsers>({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  phone: { type: Number, unique: true, required: true },
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

export default models.Users || model('Users', usersSchema);
