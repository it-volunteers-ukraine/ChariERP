import { RequestOrganizationStatus } from '@/types';
import { Schema, model, models } from 'mongoose';

interface IOrganizationData {
  edrpou: number;
  certificate: string;
  organizationName: string;
  dateOfRegistration: number;
}

interface IContactData {
  phone: string;
  email: string;
  position: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

interface IMediaData {
  site: string;
  social: string[];
}

interface IOrganizations {
  mediaData: IMediaData;
  contactData: IContactData;
  _id?: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
}

const organizationsSchema = new Schema<IOrganizations>({
  request: { type: String, enum: Object.values(RequestOrganizationStatus), required: true },
  organizationData: {
    organizationName: { type: String, unique: true, required: true },
    edrpou: { type: Number, unique: true, required: true },
    certificate: { type: String, unique: true, required: true },
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

export default models.Organizations || model('Organizations', organizationsSchema);
