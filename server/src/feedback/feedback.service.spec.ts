import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { EmailService } from '../email/email.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { faker } from '@faker-js/faker';

describe('FeedbackService', () => {
  let feedbackService: FeedbackService;

  const sendFeedbackMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: EmailService,
          useValue: {
            sendFeedback: sendFeedbackMock,
          },
        },
      ],
    }).compile();

    feedbackService = module.get<FeedbackService>(FeedbackService);
    sendFeedbackMock.mockReset();
  });

  it('should call emailService.sendFeedback with correct data and return success message', async () => {
    const mockDto: CreateFeedbackDto = {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
      phone: `+380${faker.string.numeric(9)}`,
      message: faker.lorem.sentence(),
    };

    const result = await feedbackService.create(mockDto);

    expect(sendFeedbackMock).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual({ message: 'Thanks for your feedback' });
  });
});
