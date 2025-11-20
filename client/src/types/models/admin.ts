import { Document } from 'mongoose';

import { Roles } from '@/types';

export interface IAdmin extends Document {
  role: Roles;
  email: string;
  password: string;
}
