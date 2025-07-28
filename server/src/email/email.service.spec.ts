import { EmailService } from './email.service';
import * as sgMail from '@sendgrid/mail';
import { IFeedback } from '../feedback/interfaces/feedback.interface';
import { faker } from '@faker-js/faker';

jest.mock('@sendgrid/mail', () => ({
  __esModule: true,
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

const setApiKeyMock = sgMail.setApiKey as jest.Mock;
const sendMock = sgMail.send as jest.Mock;

const createTestFeedback = (): IFeedback => ({
  lastname: faker.person.lastName(),
  firstname: faker.person.firstName(),
  email: faker.internet.email(),
  phone: `+380${faker.string.numeric(9)}`,
  message: faker.lorem.sentence(),
});

describe('EmailService', () => {
  let emailService: EmailService;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      SEND_GRID_API_KEY: 'fake-key',
      EMAIL_FROM: faker.internet.email(),
    };
    emailService = new EmailService();
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('should send email automatically', async () => {
    const mockPayload = {
      to: process.env.EMAIL_FROM!,
      from: process.env.EMAIL_FROM!,
      subject: faker.lorem.sentence(),
      text: faker.lorem.text(),
      html: `<p>${faker.lorem.paragraph()}</p>`,
    };

    sendMock.mockResolvedValueOnce({});

    await expect(emailService.send(mockPayload)).resolves.toBeUndefined();

    expect(setApiKeyMock).toHaveBeenCalledWith('fake-key');
    expect(sendMock).toHaveBeenCalledWith(mockPayload);
  });

  it('should throw error if SEND_GRID_API_KEY is missing', async () => {
    delete process.env.SEND_GRID_API_KEY;

    const mockPayload = {
      to: process.env.EMAIL_FROM!,
      from: process.env.EMAIL_FROM!,
      subject: 'Missing key',
      text: 'Test text',
      html: '<p>Test</p>',
    };

    await expect(emailService.send(mockPayload)).rejects.toThrow('Missing SEND_GRID_API_KEY');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('should throw error when sending email fails', async () => {
    sendMock.mockRejectedValueOnce(new Error('Failed to send email'));
    await expect(
      emailService.send({
        to: process.env.EMAIL_FROM!,
        from: process.env.EMAIL_FROM!,
        subject: 'Failure case',
        text: 'fail',
        html: '<p>fail</p>',
      }),
    ).rejects.toThrow('Failed to send email');
  });

  it('should throw error if EMAIL_FROM is not set in sendFeeback', async () => {
    delete process.env.EMAIL_FROM;

    emailService = new EmailService();

    const feedback = createTestFeedback();

    await expect(emailService.sendFeedback(feedback)).rejects.toThrow('Missing EMAIL_FROM');
  });

  it('should generate and send feedback email', async () => {
    const feedback = createTestFeedback();

    const emailServiceSendMock = jest.fn();
    emailService.send = emailServiceSendMock;

    await emailService.sendFeedback(feedback);

    expect(emailServiceSendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New feedback submitted',
        to: process.env.EMAIL_FROM!,
      }),
    );
  });
});
