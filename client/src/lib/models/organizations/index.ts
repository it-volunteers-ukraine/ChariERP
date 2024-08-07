import { Schema, model, models } from 'mongoose';

import { IOrganizations, RequestOrganizationStatus } from '@/types';

const organizationsSchema = new Schema<IOrganizations>({
  request: { type: String, enum: Object.values(RequestOrganizationStatus), required: true },
  organizationData: {
    organizationName: { type: String, unique: true, required: true },
    edrpou: { type: Number, unique: true, required: true },
    certificate: { type: String, required: true },
    dateOfRegistration: Date,
  },
  contactData: {
    position: { type: String, required: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    email: String,
  },
  mediaData: {
    site: { type: String },
    social: [String],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

export default models.Organizations || model<IOrganizations>('Organizations', organizationsSchema);
