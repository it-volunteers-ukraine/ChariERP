import { EmailService } from './email.service';
import sgMail from '@sendgrid/mail';
import { IFeedback } from '../feedback/interfaces/feedback.interface';

const setApiKeyMock = jest.fn();
const sendMock = jest.fn();

sgMail.setApiKey = setApiKeyMock;
sgMail.send = sendMock;

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
