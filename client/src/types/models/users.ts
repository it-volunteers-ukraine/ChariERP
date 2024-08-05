import { Document, Schema } from 'mongoose';

import { Roles, UserStatus } from '../enums';

export interface IUsers extends Document {
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
