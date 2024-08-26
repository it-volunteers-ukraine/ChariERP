import { Schema, Document } from 'mongoose';

import { RequestOrganizationStatus } from '../enums';

export interface IOrganizationData {
  edrpou: number;
  certificate: string;
  organizationName: string;
  dateOfRegistration: Date;
}

export interface IContactData {
  phone: string;
  email: string;
  position: string;
  lastName: string;
  firstName: string;
  middleName: string;
}

export interface IMediaData {
  site: string;
  social: string[];
}

export interface IOrganizations extends Document {
  mediaData: IMediaData;
  contactData: IContactData;
  _id?: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
}

export interface IOrganizationsUpdate {
  mediaData: IMediaData;
  contactData: IContactData;
  organizationData: IOrganizationData;
  request: RequestOrganizationStatus;
  users?: Schema.Types.ObjectId[];
}
