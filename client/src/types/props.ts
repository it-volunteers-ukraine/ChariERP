import { PropsWithChildren } from 'react';
import internal from 'stream';
import { SdkStreamMixin } from '@aws-sdk/types';

import { DownloadType, RequestOrganizationStatus } from './enums';

export type ChildrenProps<T = unknown> = PropsWithChildren<T>;

export interface IOrganization {
  id: string;
  email: string;
  EDRPOU: number;
  certificate: string;
  organizationName: string;
  dateOfRegistration: string;
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
}

export interface OrganizationCreateValues extends Omit<OrganizationFormValues, 'agree '> {}

export interface OrganizationUpdateValues extends Omit<OrganizationFormValues, 'agree' | 'certificate'> {
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
  edrpou: number;
};
