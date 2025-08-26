import { Request } from 'express';
import { Roles } from '../../schemas/enums';

export interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
    firstName: string;
    lastName: string;
    avatar: string;
    lastLogin: string;
    role: Roles;
    organizationId: string;
  };
}
