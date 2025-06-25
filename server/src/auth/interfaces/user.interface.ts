import { Types } from 'mongoose';
import { Roles, UserStatus } from '../../schemas/enums';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Roles;
  status: UserStatus;
  organizationId: Types.ObjectId;
  avatarUrl?: string;
  position?: string;
  dateOfEntry?: Date;
  lastLogin?: Date;
}
