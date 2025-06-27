import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { EmailService } from '../email/email.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<FeedbackDocument>,
    private readonly emailService: EmailService,
  ) {}
  async create(createFeedbackDto: CreateFeedbackDto) {
    const createdFeedback = await this.feedbackModel.create(createFeedbackDto);

    await this.emailService.sendFeedback(createdFeedback);

    const { _id: id, createdAt } = createdFeedback;

    const formattedDate = new Date(createdAt).toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      message: 'Thanks for your feedback',
      id,
      createdAt: formattedDate,
    };
  }
}
