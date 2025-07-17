import { convert } from 'html-to-text';
import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { ISendEmailPayload } from './interfaces/send-email-payload.interface';
import { IFeedback } from '../feedback/interfaces/feedback.interface';
import { generateFeedbackEmailTemplate } from './templates/feedback.template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly emailFrom: string | undefined = process.env.EMAIL_FROM;

  async send(payload: ISendEmailPayload): Promise<void> {
    const sendGridApiKey = process.env.SEND_GRID_API_KEY;

    if (!sendGridApiKey) {
      this.logger.error('SEND_GRID_API_KEY is not set in environment variables!');
      throw new Error('Missing SEND_GRID_API_KEY');
    }

    sgMail.setApiKey(sendGridApiKey);

    try {
      await sgMail.send(payload);
      this.logger.log(`Email successfully sent to ${payload.to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${payload.to}`, error);
      throw error;
    }
  }

  async sendFeedback(feedback: IFeedback) {
    if (!this.emailFrom) {
      this.logger.error('EMAIL_FROM is not set in environment variables!');
      throw new Error('Missing EMAIL_FROM');
    }

    const html = generateFeedbackEmailTemplate(feedback);
    const text = convert(html);

    await this.send({
      to: this.emailFrom,
      from: this.emailFrom,
      subject: 'New feedback submitted',
      text,
      html,
    });
  }
}
