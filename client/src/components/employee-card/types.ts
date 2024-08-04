export enum Status {
  Active = 'Active',
  Blocked = 'Blocked',
}
export interface IEmployeeCardProps {
  id: string;
  src?: string;
  name: string;
  email: string;
  status: Status;
  surname: string;
  jobTitle?: string;
  patronymic: string;
  className?: string;
  lastSession: string;
}
