import { Controller, Post, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackResponseDto } from './dto/feedback-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Create feedback message' })
  @ApiCreatedResponse({
    description: 'Feedback successfully created',
    type: FeedbackResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request — validation failed' })
  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }
}
