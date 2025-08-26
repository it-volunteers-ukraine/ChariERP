import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { AuthGuard } from '../auth/auth.guard';
import { faker } from '@faker-js/faker';

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
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<FeedbackController>(FeedbackController);
    createFeedbackMock.mockReset();
  });

  it('should call feedbackService.create with the right data and return the result', async () => {
    const mockDto: CreateFeedbackDto = {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      email: faker.internet.email(),
      phone: `+380${faker.string.numeric(9)}`,
      message: faker.lorem.sentence(),
    };

    const expectedResult = { message: 'Thanks for your feedback' };

    createFeedbackMock.mockResolvedValue(expectedResult);

    const result = await controller.create(mockDto);

    expect(createFeedbackMock).toHaveBeenCalledWith(mockDto);
    expect(result).toEqual(expectedResult);
  });
});