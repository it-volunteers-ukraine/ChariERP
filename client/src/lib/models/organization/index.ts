import { Schema, model, models } from 'mongoose';

// const urlValidator = function (value: string) {
//   const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i;

//   return urlRegex.test(value);
// };

// const organizationSchema = new Schema({
//   organizationName: { type: String, unique: true, required: true },
//   edrpou: { type: Number, unique: true, required: true },
//   certificate: { type: String, unique: true, required: true },
//   dateOfRegistration: Date,
//   executing_person: { type: String, required: true },
//   firstName: { type: String, required: true },
//   middleName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: String,
//   phone: { type: Number, unique: true, required: true },
//   website: {
//     type: String,
//     default: '',
//     validate: {
//       validator: urlValidator,
//     },
//     message: 'Please enter a valid URL',
//   },
//   social: [String],
// });

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

interface IOrganization {
  _id: Schema.Types.ObjectId;
  organizationData: IOrganizationData;
  contactData: IContactData;
  mediaData: IMediaData;
}

const organizationSchema = new Schema<IOrganization>({
  _id: Schema.Types.ObjectId,
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
    phone: { type: Number, unique: true, required: true },
    email: String,
  },
  mediaData: {
    site: { type: String, default: '' },
    social: [String],
  },
});

export default models.Organization || model('Organization', organizationSchema);
