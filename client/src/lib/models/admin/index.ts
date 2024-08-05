import { Schema, model, models } from 'mongoose';

import { IAdmin, Roles } from '@/types';

const SuperAdminSchema = new Schema<IAdmin>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: Roles.ADMIN },
});

export default models.SuperAdmin || model<IAdmin>('SuperAdmin', SuperAdminSchema);
