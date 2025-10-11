import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { AppModule } from '../src/app.module';
import { EmailService } from '../src/email/email.service';
import { testMongoConfig } from './in-memory.mongo.config';
import { VALIDATION_MESSAGES } from '../src/constants/validation-messages';
import { Model } from 'mongoose';
import { User } from '../src/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Roles, UserStatus } from '../src/schemas/enums';

const createTestUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: `+${faker.string.numeric(12)}`,
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12 }),
  role: Roles.USER,
  status: UserStatus.ACTIVE,
  organizationId: faker.database.mongodbObjectId(),
});

const createValidFeedbackPayload = () => ({
  lastname: faker.person.lastName(),
  firstname: faker.person.firstName(),
  email: faker.internet.email(),
  phone: `+380${faker.string.numeric(9)}`,
  message: faker.lorem.sentence(),
});

describe('FeedbackController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;
  let accessToken: string;
  let testUser: ReturnType<typeof createTestUser>;

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

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));

    testUser = createTestUser();
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await userModel.create({
      ...testUser,
      password: hashedPassword,
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testUser.email, password: testUser.password })
      .expect(HttpStatus.OK);

    accessToken = loginResponse.body.access_token;
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
    await testMongoConfig.dropDatabase();
  });

  it('/feedback (POST) 200', async () => {
    const validPayload = createValidFeedbackPayload();

    const res = await request(app.getHttpServer())
      .post('/feedback')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(validPayload)
      .expect(HttpStatus.OK);

    expect(res.body).toEqual({ message: 'Thanks for your feedback' });
  });

  it('/feedback (POST) 401 - Unauthorized without token', async () => {
    const validPayload = createValidFeedbackPayload();

    const response = await request(app.getHttpServer())
      .post('/feedback')
      .set('Accept', 'application/json')
      .send(validPayload)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Unauthorized');
    expect(response.body).toHaveProperty('statusCode', HttpStatus.UNAUTHORIZED);
    expect(response.body).not.toHaveProperty('message', 'Thanks for your feedback');
  });

  describe('/feedback (POST) 400', () => {
    const validationTestCases = [
      {
        description: 'should fail with invalid email',
        payload: {
          ...createValidFeedbackPayload(),
          email: 'invalid-email',
        },
        expectedMessage: VALIDATION_MESSAGES.EMAIL.INVALID,
      },
      {
        description: 'should fail with invalid phone',
        payload: {
          ...createValidFeedbackPayload(),
          phone: '0991234567',
        },
        expectedMessage: VALIDATION_MESSAGES.PHONE.INVALID,
      },
      {
        description: 'should fail with too long message',
        payload: {
          ...createValidFeedbackPayload(),
          message: 'a'.repeat(401),
        },
        expectedMessage: VALIDATION_MESSAGES.FEEDBACK.MESSAGE_MAX_LENGTH,
      },
    ];

    test.each(validationTestCases)('$description', async ({ payload, expectedMessage }) => {
      const res = await request(app.getHttpServer())
        .post('/feedback')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST);

      const { message } = res.body;
      expect(message).toContain(expectedMessage);
    });
  });
});
