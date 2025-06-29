import { IFeedback } from '../interfaces/feedback.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';
import { UA_PHONE_REGEX } from '../../constants/regex.constants';

export class CreateFeedbackDto implements IFeedback {
  @ApiProperty({ required: true, example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ required: true, example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL.INVALID })
  email: string;

  @ApiProperty({ required: true, example: '+380991234567' })
  @IsNotEmpty()
  @IsString()
  @Matches(UA_PHONE_REGEX, {
    message: 'phone number must be in the format +380XXXXXXXXX',
  })
  phone: string;

  @ApiProperty({ required: true, example: 'Thank you for the great service!' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(400, {
    message:
      'feedback message is too long. Maximal length is $constraint1 characters',
  })
  message: string;
}
