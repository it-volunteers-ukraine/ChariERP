import { ApiProperty } from '@nestjs/swagger';

export class FeedbackResponseDto {
  @ApiProperty({
    example: 'Thanks for your feedback',
  })
  message: string;
}
