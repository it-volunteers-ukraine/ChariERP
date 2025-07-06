import { EmailService } from './email.service';
import * as sgMail from '@sendgrid/mail';
import { IFeedback } from '../feedback/interfaces/feedback.interface';

jest.mock('@sendgrid/mail', () => ({
  __esModule: true,
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

const setApiKeyMock = sgMail.setApiKey as jest.Mock;
const sendMock = sgMail.send as jest.Mock;

describe('EmailService', () => {
  let emailService: EmailService;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      SEND_GRID_API_KEY: 'fake-key',
      EMAIL_FROM: 'org@example.com',
    };
    emailService = new EmailService();
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('should initialize with valid variables', () => {
    expect(setApiKeyMock).toHaveBeenCalledWith('fake-key');
  });

   it('should throw error if SEND_GRID_API_KEY is missing', () => {
    delete process.env.SEND_GRID_API_KEY;
    process.env.EMAIL_FROM = 'org@example.com';

    expect(() => new EmailService()).toThrow('Missing SEND_GRID_API_KEY');
  });

  it('should throw error if EMAIL_FROM is missing', () => {
    process.env.SEND_GRID_API_KEY = 'fake-key';
    delete process.env.EMAIL_FROM;

    expect(() => new EmailService()).toThrow('Missing EMAIL_FROM');
  });

  it('should send email automatically', async () => {
    const mockPayload = {
      to: 'org@example.com',
      from: 'org@example.com',
      subject: 'New feedback submitted',
      text: 'Test text',
      html: '<p>Test</p>',
    };

    sendMock.mockResolvedValueOnce({});
    await expect(emailService.send(mockPayload)).resolves.toBeUndefined();
    expect(sendMock).toHaveBeenCalledWith(mockPayload);
  });

  it('should throw error when sending email fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('Failed to send email'));
    await expect(
      emailService.send({
        to: 'org@example.com',
        from: 'org@example.com',
        subject: 'fail',
        text: 'fail',
        html: '<p>fail</p>',
      }),
    ).rejects.toThrow('Failed to send email');
  });

  it('should generate and send feedback email', async () => {
    const feedback: IFeedback = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      phone: '+380991234567',
      message: 'Thank you for the great service!',
    };

    const emailServiceSendMock = jest.fn();
    emailService.send = emailServiceSendMock;

    await emailService.sendFeedback(feedback);

    expect(emailServiceSendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New feedback submitted',
        to: 'org@example.com',
      }),
    );
  });
});
