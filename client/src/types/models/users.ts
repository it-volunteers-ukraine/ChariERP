import { Document, Schema } from 'mongoose';

import { Roles, UserStatus } from '../enums';

export interface IUsers extends Document {
  role: Roles;
  phone: string;
  notes: string;
  email: string;
  address: string;
  lastLogin: Date;
  lastName: string;
  password: string;
  position: string;
  dateOfBirth: Date;
  dateOfEntry: Date;
  firstName: string;
  avatarUrl?: string;
  middleName: string;
  status: UserStatus;
  _id: Schema.Types.ObjectId;
  organizationId: Schema.Types.ObjectId;
}

export interface IUsersNormalizeResponse {
  id: string;
  email: string;
  status: string;
  lastName: string;
  position: string;
  firstName: string;
  lastLogin: string;
  avatarUrl: string;
  middleName: string;
}
