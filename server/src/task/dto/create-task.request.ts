import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequest {
  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f3a',
    description: 'ID of the column to which the task is added',
  })
  @IsString()
  columnId: string;

  @ApiProperty({
    required: true,
    example: '60c72b2f9b1d8c001c8e4f32',
    description: 'ID of the user (manager) who creates the task',
  })
  @IsString()
  userId: string;
}
