import { Injectable, Logger } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
import { ISendEmailPayload } from './interfaces/send-email-payload.interface';
import { IFeedback } from '../feedback/interfaces/feedback.interface';
import { generateFeedbackEmailTemplate } from './templates/feedback.template';
import htmlText from 'html-text';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly emailFrom: string;

  constructor() {
    const sendGridApiKey = process.env.SEND_GRID_API_KEY;
    const emailFrom = process.env.EMAIL_FROM;

    if (!sendGridApiKey) {
      this.logger.error(
        'SEND_GRID_API_KEY is not set in environment variables!',
      );
      throw new Error('Missing SEND_GRID_API_KEY');
    }

    if (!emailFrom) {
      this.logger.error('EMAIL_FROM is not set in environment variables!');
      throw new Error('Missing EMAIL_FROM');
    }

    this.emailFrom = emailFrom;
    sgMail.setApiKey(sendGridApiKey);
  }

  async send(payload: ISendEmailPayload): Promise<void> {
    try {
      await sgMail.send(payload);
      this.logger.log(`Email successfully sent to ${payload.to}`);
    } catch (error) {
      this.logger.error('Failed to send email', error);
      throw error;
    }
  }

  async sendFeedback(feedback: IFeedback) {
    const html = generateFeedbackEmailTemplate(feedback);
    const text = htmlText(html);

    await this.send({
      to: this.emailFrom,
      from: this.emailFrom,
      subject: 'New feedback submitted',
      text,
      html,
    });
  }
}
