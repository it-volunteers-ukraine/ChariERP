import { PropsWithChildren } from 'react';
import internal from 'stream';
import { SdkStreamMixin } from '@aws-sdk/types';

export type ChildrenProps<T = unknown> = PropsWithChildren<T>;

export interface IOrganization {
  id: string;
  certificate: string;
  dateOfRegistration: Date;
  email: string;
  EDRPOU: number;
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
}

export interface IParamsPagination {
  page: number;
  limit?: number;
  sort?: Record<string, number>;
}
