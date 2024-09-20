import { Schema, model, models } from 'mongoose';

import { Users } from '@/lib';
import { IOrganizations, RequestOrganizationStatus } from '@/types';

const organizationsSchema = new Schema<IOrganizations>({
  request: { type: String, enum: Object.values(RequestOrganizationStatus), required: true },
  organizationData: {
    organizationName: { type: String, required: true },
    edrpou: { type: Number, unique: true, required: true },
    certificate: { type: String, required: true },
    dateOfRegistration: { type: Date, required: true },
  },
  contactData: {
    position: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
  },
  mediaData: {
    site: { type: String },
    social: [String],
  },
  requestDate: { type: Date, default: Date.now },
  approvalDate: { type: Date, default: Date.now },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

organizationsSchema.pre('findOneAndDelete', async function (next) {
  const organization = await this.model.findOne(this.getFilter()).populate('users');

  if (organization) {
    await Users.deleteMany({ _id: { $in: organization.users } });
  }

  next();
});

export default models.Organizations || model<IOrganizations>('Organizations', organizationsSchema);
