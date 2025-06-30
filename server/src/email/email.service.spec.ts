import { EmailService } from './email.service';
import sgMail from '@sendgrid/mail';
import { IFeedback } from '../feedback/interfaces/feedback.interface';

jest.mock('@sendgrid/mail');

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
    // ⚠️ ESLint попередження: метод використовується без привʼязки до контексту (`this`)
    // Безпечний випадок, бо `sgMail.setApiKey` замоканий
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(sgMail.setApiKey).toHaveBeenCalledWith('fake-key');
  });

  it('should send email automatically', async () => {
    const mockPayload = {
      to: 'org@example.com',
      from: 'org@example.com',
      subject: 'New feedback submitted',
      text: 'Test text',
      html: '<p>Test</p>',
    };

    (sgMail.send as jest.Mock).mockResolvedValueOnce({});
    await expect(emailService.send(mockPayload)).resolves.toBeUndefined();
    // ⚠️ ESLint попередження: метод використовується без привʼязки до контексту (`this`)
    // Безпечний випадок, бо `sgMail.send` замоканий
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(sgMail.send).toHaveBeenCalledWith(mockPayload);
  });

  it('should throw error when sending email fails', async () => {
    (sgMail.send as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to send email'),
    );
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

  it('should generate and send feeback email', async () => {
    const feedback: IFeedback = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      phone: '+380991234567',
      message: 'Thank you for the great service!',
    };

    emailService.send = jest.fn();
    await emailService.sendFeedback(feedback);
    // ⚠️ ESLint попередження: метод використовується без привʼязки до контексту (`this`)
    // Безпечний випадок, бо `emailService.send` замоканий
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(emailService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: 'New feedback submitted',
        to: 'org@example.com',
      }),
    );
  });
});
