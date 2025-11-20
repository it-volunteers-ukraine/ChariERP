import { Document, Schema } from 'mongoose';

import { RequestOrganizationStatus } from '@/types';

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
  declinedDate: Date;
  approvalDate: Date;
  mediaData: IMediaData;
  declineReason?: string;
  contactData: IContactData;
  users: Schema.Types.ObjectId[];
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
}

export interface IOrganizationsUpdate {
  approvalDate?: Date;
  mediaData: IMediaData;
  declineReason?: string;
  contactData: IContactData;
  users?: Schema.Types.ObjectId[];
  request: RequestOrganizationStatus;
  organizationData: IOrganizationData;
}
