import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EmailService } from '../src/email/email.service';
import { testMongoConfig } from './in-memory.mongo.config';
import { VALIDATION_MESSAGES } from '../src/constants/validation-messages';

describe('FeedbackController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await testMongoConfig.setUp();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailService)
      .useValue({ sendFeedback: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
    await testMongoConfig.dropDatabase();
  });

  it('/feedback (POST) 200', async () => {
    const validPayload = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'john.doe@example.com',
      phone: '+380991234567',
      message: 'Thank you for the great service!',
    };

    const res = await request(app.getHttpServer())
      .post('/feedback')
      .set('Accept', 'application/json')
      .send(validPayload)
      .expect(HttpStatus.OK);

    expect(res.body).toEqual({ message: 'Thanks for your feedback' });
  });

  describe('/feedback (POST) 400', () => {
    const validationTestCases = [
      {
        description: 'should fail with invalid email',
        payload: {
          lastname: 'Doe',
          firstname: 'John',
          email: 'invalid-email',
          phone: '+380991234567',
          message: 'Test message',
        },
        expectedMessage: VALIDATION_MESSAGES.EMAIL.INVALID,
      },
      {
        description: 'should fail with invalid phone',
        payload: {
          lastname: 'Doe',
          firstname: 'John',
          email: 'john.doe@example.com',
          phone: '0991234567',
          message: 'Test message',
        },
        expectedMessage: VALIDATION_MESSAGES.PHONE.INVALID,
      },
      {
        description: 'should fail with too long message',
        payload: {
          lastname: 'Doe',
          firstname: 'John',
          email: 'john.doe@example.com',
          phone: '+380991234567',
          message: 'a'.repeat(401),
        },
        expectedMessage: VALIDATION_MESSAGES.FEEDBACK.MESSAGE_TOO_LONG,
      },
    ];

    test.each(validationTestCases)('$description', async ({ payload, expectedMessage }) => {
      const res = await request(app.getHttpServer()).post('/feedback').send(payload).expect(HttpStatus.BAD_REQUEST);

      const { message } = res.body;
      expect(message).toContain(expectedMessage);
    });
  });
});
