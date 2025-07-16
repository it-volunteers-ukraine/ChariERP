import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

describe('FeedbackController', () => {
  let controller: FeedbackController;

  const createFeedbackMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            create: createFeedbackMock,
          },
        },
      ],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    createFeedbackMock.mockReset();
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

    createFeedbackMock.mockResolvedValue(expectedResult);

    const result = await controller.create(mockDto);

    expect(createFeedbackMock).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(expectedResult);
  });
});
