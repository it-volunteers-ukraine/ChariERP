import { EmailService } from './email.service';
import { Resend } from 'resend';
import { IFeedback } from '../feedback/interfaces/feedback.interface';
import { faker } from '@faker-js/faker';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}));

const createTestFeedback = (): IFeedback => ({
  lastname: faker.person.lastName(),
  firstname: faker.person.firstName(),
  email: faker.internet.email(),
  phone: `+380${faker.string.numeric(9)}`,
  message: faker.lorem.sentence(),
});

describe('EmailService', () => {
  let emailService: EmailService;
  let mockResendSend: jest.Mock;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      RESEND_API_KEY: 'fake-resend-key',
      EMAIL_FROM: faker.internet.email(),
    };

    mockResendSend = jest.fn();
    (Resend as jest.Mock).mockImplementation(() => ({
      emails: {
        send: mockResendSend,
      },
    }));

    emailService = new EmailService();
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  it('should send email successfully', async () => {
    const mockPayload = {
      to: process.env.EMAIL_FROM!,
      from: process.env.EMAIL_FROM!,
      subject: faker.lorem.sentence(),
      text: faker.lorem.text(),
      html: `<p>${faker.lorem.paragraph()}</p>`,
    };

    mockResendSend.mockResolvedValueOnce({
      data: { id: 'test-email-id' },
      error: null,
    });

    await expect(emailService.send(mockPayload)).resolves.toBeUndefined();

    expect(mockResendSend).toHaveBeenCalledWith({
      from: mockPayload.from,
      to: [mockPayload.to], // Note: Resend expects array
      subject: mockPayload.subject,
      text: mockPayload.text,
      html: mockPayload.html,
    });
  });

  it('should throw error if RESEND_API_KEY is missing', () => {
    delete process.env.RESEND_API_KEY;

    expect(() => new EmailService()).toThrow('Missing RESEND_API_KEY');
  });

  it('should throw error when Resend API returns error', async () => {
    const mockPayload = {
      to: process.env.EMAIL_FROM!,
      from: process.env.EMAIL_FROM!,
      subject: 'Failure case',
      text: 'fail',
      html: '<p>fail</p>',
    };

    mockResendSend.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid API key' },
    });

    await expect(emailService.send(mockPayload)).rejects.toThrow('Resend API error: Invalid API key');
  });

  it('should throw error when network/other error occurs', async () => {
    const mockPayload = {
      to: process.env.EMAIL_FROM!,
      from: process.env.EMAIL_FROM!,
      subject: 'Network failure case',
      text: 'fail',
      html: '<p>fail</p>',
    };

    mockResendSend.mockRejectedValueOnce(new Error('Network error'));

    await expect(emailService.send(mockPayload)).rejects.toThrow('Network error');
  });

  it('should throw error if EMAIL_FROM is not set in sendFeedback', async () => {
    delete process.env.EMAIL_FROM;

    emailService = new EmailService();

    const feedback = createTestFeedback();

    await expect(emailService.sendFeedback(feedback)).rejects.toThrow('Missing EMAIL_FROM');
  });

  it('should generate and send feedback email', async () => {
    const feedback = createTestFeedback();

    const emailServiceSendMock = jest.fn().mockResolvedValue(undefined);
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
