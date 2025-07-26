import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';

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
