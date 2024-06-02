import { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export default models.Admin || model('Admin', AdminSchema);
