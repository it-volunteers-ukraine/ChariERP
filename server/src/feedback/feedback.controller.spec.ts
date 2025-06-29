import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let feedbackService: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    feedbackService = module.get<FeedbackService>(FeedbackService);
  });

  it('should call feedbackService.create with the right data and return the result', async () => {
    const mockDto: CreateFeedbackDto = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      phone: '+380991234567',
      message: 'Thank you for the great service!',
    };

    const expectedResult = { message: 'Thanks for your feedback' };

    (feedbackService.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await controller.create(mockDto);

    // ⚠️ ESLint попередження — бо це виклик методу класу без this
    // Це безпечно, бо create тут замінено на jest.fn()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(feedbackService.create).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(expectedResult);
  });
});
