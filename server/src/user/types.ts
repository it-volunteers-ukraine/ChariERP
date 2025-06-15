import { Roles } from 'src/schemas';

export interface AssertHasRole {
  role?: Roles;
  userId: string;
  message?: string;
}
