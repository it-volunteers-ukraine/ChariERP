import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { EmailService } from '../email/email.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

describe('FeddbackService', () => {
  let feedbackService: FeedbackService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: EmailService,
          useValue: {
            sendFeedback: jest.fn(),
          },
        },
      ],
    }).compile();

    feedbackService = module.get<FeedbackService>(FeedbackService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should call emailService.sendFeedback with correct data and return success message', async () => {
    const mockDto: CreateFeedbackDto = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      phone: '+380991234567',
      message: 'Thank you for the great service!',
    };

    const result = await feedbackService.create(mockDto);

    // ⚠️ ESLint попередження — бо це виклик методу класу без this
    // Це безпечно, бо sendFeedback тут замінено на jest.fn()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(emailService.sendFeedback).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual({ message: 'Thanks for your feedback' });
  });

  it('should throw an error if emailService.sendFeedback fails', async () => {
    const mockDto: CreateFeedbackDto = {
      firstname: 'Fail',
      lastname: 'Case',
      email: 'fail@example.com',
      phone: '+380998765432',
      message: 'Oops',
    };

    (emailService.sendFeedback as jest.Mock).mockRejectedValue(
      new Error('Send error'),
    );

    await expect(feedbackService.create(mockDto)).rejects.toThrow('Send error');
  });
});
