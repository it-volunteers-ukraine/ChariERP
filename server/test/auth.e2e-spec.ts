import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { VALIDATION_MESSAGES } from '../src/constants/validation-messages';
import { testMongoConfig } from './in-memory.mongo.config';
import { Model } from 'mongoose';
import { User } from '../src/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Roles, UserStatus } from '../src/schemas/enums';

describe('AuthController (e2e)', () => {
  const email = 'john.doe@company.com';
  const password = 'SecurePass123!';

  let app: INestApplication;
  let userModel: Model<User>;

  beforeAll(async () => {
    await testMongoConfig.setUp();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userModel = moduleFixture.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
    await testMongoConfig.dropCollections();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await testMongoConfig.dropDatabase();
  });

  async function createUser(): Promise<User> {
    const hashedPassword = await bcrypt.hash('SecurePass123!', 10);
    const user = await userModel.create({
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      email: email,
      password: hashedPassword,
      role: Roles.USER,
      status: UserStatus.ACTIVE,
      organizationId: '507f1f77bcf86cd799439011', // Mock ObjectId
    });

    expect(await userModel.countDocuments()).toEqual(1);

    return user;
  }

  it('/auth/login (POST) 200', async () => {
    const existingUser = await createUser();

    const loginPayload = { email, password };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginPayload)
      .expect(HttpStatus.OK);

    const userObject = JSON.parse(JSON.stringify(existingUser));
    const expectedResponse = {
      ...userObject,
      lastLogin: expect.any(String), // lastLogin is updated during login
      password: undefined, // Override password to undefined since it should be excluded
    };

    expect(response.body).toEqual(expectedResponse);
    expect(response.body.password).toBeUndefined(); // Password should not be returned
  });

  describe('/auth/login (POST) 400', () => {
    const validationTestCases = [
      {
        description: 'should return validation error for invalid email',
        payload: {
          email: 'invalid-email',
          password: 'SecurePass123!',
        },
        expectedMessage: VALIDATION_MESSAGES.EMAIL.INVALID,
      },
      {
        description: 'should return validation error for short password',
        payload: {
          email: 'test@example.com',
          password: '123',
        },
        expectedMessage: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH,
      },
      {
        description: 'should return validation error for long password',
        payload: {
          email: 'test@example.com',
          password: 'a'.repeat(25),
        },
        expectedMessage: VALIDATION_MESSAGES.PASSWORD.MAX_LENGTH,
      },
    ];

    test.each(validationTestCases)('$description', ({ payload, expectedMessage }) => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(payload)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((res) => {
          expect(res.body.message).toContain(expectedMessage);
        });
    });
  });
});
