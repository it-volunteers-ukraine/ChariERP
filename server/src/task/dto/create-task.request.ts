import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateTaskRequest {
  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'ID of the column to which the task is added',
  })
  @Transform(({ value }) => new Types.ObjectId(String(value)))
  @IsMongoId()
  @IsNotEmpty()
  columnId: string;

  //#TODO: Delete when jwt token is implemented
  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f32',
    description: 'ID of the user (manager) who creates the task',
  })
  @Transform(({ value }) => new Types.ObjectId(String(value)))
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
