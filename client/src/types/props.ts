import { PropsWithChildren } from 'react';
import internal from 'stream';
import { Schema } from 'mongoose';
import { SdkStreamMixin } from '@aws-sdk/types';

import { IAdmin, IUsers } from './models';
import { DownloadType, RequestOrganizationStatus, UserStatus } from './enums';

export type ChildrenProps<T = unknown> = PropsWithChildren<T>;

export interface IOrganization {
  id: string;
  email: string;
  EDRPOU: string;
  certificate: string;
  requestDate: string;
  approvalDate: string;
  organizationName: string;
}

export interface IOrganizationPageProps extends Omit<IOrganization, 'certificate'> {
  users: number;
}

export interface RowItemProps {
  isLaptop: boolean;
  path: string | null;
  item: IOrganization;
  getData: () => void;
}

export interface RowItemOrgProps {
  item: IOrganizationPageProps;
}

export interface GetUrlProps {
  url: string;
  file: (internal.Readable & SdkStreamMixin) | (Blob & SdkStreamMixin) | (ReadableStream<Uint8Array> & SdkStreamMixin);
  downloadType?: DownloadType;
}

export interface IParamsPagination {
  page: number;
  limit?: number;
  sort?: Record<string, number>;
}

export interface OrganizationFormValues {
  site: string;
  email: string;
  phone: string;
  agree: boolean;
  edrpou: string;
  lastName: string;
  social: string[];
  position: string;
  firstName: string;
  middleName: string;
  organizationName: string;
  certificate: File | string;
  dateOfRegistration: string;
}

export interface OrganizationEditValues extends Omit<OrganizationFormValues, 'agree' | 'dateOfRegistration'> {
  dateOfRegistration: Date;
  declineReason?: string;
}

export type OrganizationCreateValues = Omit<OrganizationFormValues, 'agree '>;

export interface OrganizationUpdateValues extends Omit<OrganizationFormValues, 'agree' | 'certificate'> {
  declineReason?: string;
  request?: RequestOrganizationStatus;
}

export interface AdminOrganizationProps {
  page: number;
  limit?: number;
  populate?: string;
  filterStatus: RequestOrganizationStatus;
}

export type Fields = {
  email: string;
  edrpou: string;
};

export interface IUsersByOrganizationProps {
  id: string;
  page: number;
  limit?: number;
}

export interface ICustomer extends IAdmin, IUsers {}

export interface ICreateUser {
  email: string;
  notes: string;
  phone: string;
  address: string;
  lastName: string;
  password: string;
  position: string;
  firstName: string;
  middleName: string;
  dateOfBirth: number;
  dateOfEntry: number;
  avatarUrl: File | string;
  organizationId: Schema.Types.ObjectId | undefined;
}

export interface IEditUser extends Omit<ICreateUser, 'password' | 'organizationId' | 'dateOfEntry' | 'dateOfBirth'> {
  status: UserStatus;
  lastLogin: string | number;
  dateOfEntry: string | number;
  dateOfBirth: string | number;
}
