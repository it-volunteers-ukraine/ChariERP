import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class FeedbackService {
  constructor(private readonly emailService: EmailService) {}
  async create(createFeedbackDto: CreateFeedbackDto) {
    await this.emailService.sendFeedback(createFeedbackDto);

    return {
      message: 'Thanks for your feedback',
    };
  }
}
