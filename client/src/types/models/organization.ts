import { Schema, Document } from 'mongoose';

import { RequestOrganizationStatus } from '../enums';

export interface IOrganizationData {
  edrpou: string;
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
  requestDate: Date;
  approvalDate: Date;
  mediaData: IMediaData;
  contactData: IContactData;
  _id: Schema.Types.ObjectId;
  users: Schema.Types.ObjectId[];
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
}

export interface IOrganizationsUpdate {
  approvalDate?: Date;
  mediaData: IMediaData;
  contactData: IContactData;
  organizationData: IOrganizationData;
  request: RequestOrganizationStatus;
  users?: Schema.Types.ObjectId[];
}
