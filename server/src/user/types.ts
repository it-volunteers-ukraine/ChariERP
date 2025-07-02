import { Roles } from 'src/schemas/enums';

export interface AssertHasRole {
  role?: Roles;
  userId: string;
  message?: string;
}
