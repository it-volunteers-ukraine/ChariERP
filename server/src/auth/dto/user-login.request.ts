import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
import { Roles, UserStatus } from '../../schemas/enums';
import { Types } from 'mongoose';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';
import { Exclude } from 'class-transformer';

export class UserLoginRequest {
  @ApiProperty({ required: true, example: 'john.doe@company.com' })
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL.INVALID })
  email: string;

  @ApiProperty({ required: true, example: 'SecurePass123!' })
  @IsString()
  @MinLength(8, { message: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH })
  @MaxLength(20, { message: VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH })
  password: string;
}

export class UserLoginResponse implements IUser {
  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatarUrl: string;
  dateOfEntry: Date;

  @ApiProperty({ example: 'john.doe@company.com' })
  email: string;
  firstName: string;
  lastLogin: Date;
  lastName: string;
  phone: string;
  position: string;
  role: Roles;
  status: UserStatus;

  @ApiProperty({ type: String, format: 'binary' })
  organizationId: Types.ObjectId;

  @Exclude()
  password?: string;
}
