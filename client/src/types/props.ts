import { PropsWithChildren } from 'react';
import internal from 'stream';
import { Schema } from 'mongoose';
import { SdkStreamMixin } from '@aws-sdk/types';

import { IAdmin, IBoardColumn, ICreateTask, ITask, IUsers } from './models';
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

export interface TaskPageParamsProps {
  params: { task_id: string; column_id: string; board_id: string };
}

export interface ICreateTaskProps {
  userId: string;
  boardId: string;
  columnId: string;
  task: ICreateTask;
}

export interface ICreateColumnProps {
  title: string;
  boardId: string;
  userId: string;
}

export interface IUseColumns {
  boardId: string;
  userId: string;
}
export interface IGetColumnsProps {
  boardId: string;
  userId: string;
}

export interface IEditColumnProps {
  data: Omit<IBoardColumn, '_id' | 'created_at' | 'order'>;
  boardId: string;
  userId: string;
}

export interface IDeleteColumnProps {
  boardId: string;
  userId: string;
  columnId: string;
}

export interface IUsersNormalizer {
  id: string;
  lastName: string;
  firstName: string;
  avatarUrl: string;
}

export interface ITaskUsersNormalizer extends Omit<ITask, 'users'> {
  users: IUsersNormalizer[];
}

export interface IBoardColumnTasksForFront extends Omit<IBoardColumn, 'task_ids'> {
  task_ids: ITaskUsersNormalizer[];
}
export interface IChangeColumnTitleProps {
  boardId: string;
  userId: string;
  columnId: string;
  title: string;
}

export interface IMoveBoardColumnProps {
  boardId: string;
  userId: string;
  sourceIndex: number;
  destinationIndex: number;
}

export interface IDeleteTaskProps {
  boardId: string;
  userId: string;
  taskId: string;
}

export interface IMoveTaskProps {
  boardId: string;
  userId: string;
  taskId: string;
  columnId: string;
  destinationIndex: number;
  destinationColumnId: string;
}

export type ResponseGetType = { success: boolean; data?: string; message?: string };

export interface IUpdateOrganizationByManager {
  userId: string;
  formData: FormData;
  organizationId: string;
}
