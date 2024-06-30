import { Schema, model, models } from 'mongoose';

const SuperAdminSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default models.SuperAdmin || model('SuperAdmin', SuperAdminSchema);
