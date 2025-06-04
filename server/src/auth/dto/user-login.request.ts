import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';
import { Roles, UserStatus } from '../../schemas/enums';
import { Types } from 'mongoose';

export class UserLoginRequest {
  @ApiProperty({ required: true, example: 'john.doe@company.com' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @ApiProperty({ required: true, example: 'SecurePass123!' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be no more 20 characters long' })
  password: string;
}

export class UserLoginResponse implements IUser {
  @ApiProperty({example: 'https://example.com/avatar.jpg'})
  avatarUrl: string;
  dateOfEntry: Date;
  @ApiProperty({ example: 'john.doe@company.com' })
  email: string;
  firstName: string;
  lastLogin: Date;
  lastName: string;
  @ApiProperty({type: String, format: 'binary'})
  organizationId: Types.ObjectId;
  phone: string;
  position: string;
  role: Roles;
  status: UserStatus;
}