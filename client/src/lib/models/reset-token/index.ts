import { model, models, Schema } from 'mongoose';

import { IResetToken } from '@/types';
import { tokenExpiryTime } from '@/constants';

const resetTokenSchema = new Schema<IResetToken>({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

resetTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: tokenExpiryTime });

export default models.Reset_Token || model<IResetToken>('Reset_Token', resetTokenSchema);
