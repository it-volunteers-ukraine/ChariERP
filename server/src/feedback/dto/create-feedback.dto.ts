import { IFeedback } from '../interfaces/feedback.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';
import { UA_PHONE_REGEX } from '../../constants/regex.constants';

export class CreateFeedbackDto implements IFeedback {
  @ApiProperty({ required: true, example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  lastname: string;

  @ApiProperty({ required: true, example: 'John' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  firstname: string;

  @ApiProperty({ required: true, example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL.INVALID })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({ required: true, example: '+380991234567' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @Matches(UA_PHONE_REGEX, {
    message: VALIDATION_MESSAGES.PHONE.INVALID,
  })
  phone: string;

  @ApiProperty({ required: true, example: 'Thank you for the great service!' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  @MaxLength(400, {
    message: VALIDATION_MESSAGES.FEEDBACK.MESSAGE_MAX_LENGTH,
  })
  message: string;
}
