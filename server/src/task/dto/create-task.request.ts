import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequest {
  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'ID of the column to which the task is added',
  })
  @IsMongoId()
  @IsNotEmpty()
  columnId: string;

  //#TODO: Delete when jwt token is implemented
  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f32',
    description: 'ID of the user (manager) who creates the task',
  })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
