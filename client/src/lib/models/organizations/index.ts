import { RequestOrganizationStatus } from '@/types';
import { Schema, model, models } from 'mongoose';

interface IOrganizationData {
  organizationName: string;
  edrpou: number;
  certificate: string;
  dateOfRegistration: number;
}

interface IContactData {
  position: string;
  lastName: string;
  firstName: string;
  middleName: string;
  phone: string;
  email: string;
}

interface IMediaData {
  site: string;
  social: string[];
}

interface IOrganizations {
  _id?: Schema.Types.ObjectId;
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
  contactData: IContactData;
  mediaData: IMediaData;
  users: Schema.Types.ObjectId[];
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
