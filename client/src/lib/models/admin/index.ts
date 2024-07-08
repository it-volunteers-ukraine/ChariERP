import { Schema, model, models } from 'mongoose';

const SuperAdminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

export default models.SuperAdmin || model('SuperAdmin', SuperAdminSchema);
