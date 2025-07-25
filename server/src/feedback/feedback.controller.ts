import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
@ApiBearerAuth()
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Send feedback message' })
  @ApiOkResponse({
    description: 'Feedback successfully sent',
    type: FeedbackResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
