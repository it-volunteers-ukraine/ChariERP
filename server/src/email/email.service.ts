import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { ISendEmailPayload } from './interfaces/send-email-payload.interface';
import { convert } from 'html-to-text';
import { generateFeedbackEmailTemplate } from './templates/feedback.template';
import { IFeedback } from '../feedback/interfaces/feedback.interface';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly emailFrom: string | undefined = process.env.EMAIL_FROM;
  private readonly resend: Resend;

  constructor() {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      this.logger.error('RESEND_API_KEY is not set in environment variables!');
      throw new Error('Missing RESEND_API_KEY');
    }

    this.resend = new Resend(resendApiKey);
  }

  async send(payload: ISendEmailPayload): Promise<void> {
    const { data, error } = await this.resend.emails.send(payload);

    if (error) {
      this.logger.error(`Failed to send email to ${payload.to}`, error);
      throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
    }

    this.logger.log(`Email successfully sent to ${payload.to} with ID: ${data?.id}`);
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
