import { Schema, model, models } from 'mongoose';

type Roles = 'admin' | 'manager' | 'user';

interface IUser {
  // _id?: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: Roles;
}

const userSchema = new Schema<IUser>({
  // _id: { type: Schema.Types.ObjectId },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});

export default models.User || model('User', userSchema);
