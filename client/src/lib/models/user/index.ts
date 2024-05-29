import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default models.User || model('User', userSchema);
