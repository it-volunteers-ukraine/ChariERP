import { PropsWithChildren } from 'react';

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
}

export interface RowItemOrgProps {
  item: IOrganizationPageProps;
}
