import { Schema, model, models } from 'mongoose';

import { Roles } from '@/types';

const SuperAdminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: Roles.ADMIN },
});

export default models.SuperAdmin || model('SuperAdmin', SuperAdminSchema);
