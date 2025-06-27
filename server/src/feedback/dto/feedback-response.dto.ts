import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponseDto {
  @ApiProperty({
    example: 'Thanks for your feedback',
  })
  message: string;

  @ApiProperty({
    example: '665fa8f0234a22f5c3fa7cd1',
  })
  id: string;

  @ApiProperty({
    example: '2025-06-24T12:34:56.789Z',
    format: 'date-time',
  })
  createdAt: Date;
}
