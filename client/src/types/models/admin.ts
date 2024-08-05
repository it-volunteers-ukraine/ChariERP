import { Document, Schema } from 'mongoose';

import { Roles } from '../enums';

export interface IAdmin extends Document {
  role: Roles;
  email: string;
  password: string;
  _id?: Schema.Types.ObjectId;
}
