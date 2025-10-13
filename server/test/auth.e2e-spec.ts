import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../src/app.module';
import { VALIDATION_MESSAGES } from '../src/constants/validation-messages';
import { testMongoConfig } from './in-memory.mongo.config';
import mongoose, { Model } from 'mongoose';
import { User } from '../src/schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Roles, UserStatus } from '../src/schemas/enums';
import { faker } from '@faker-js/faker';
import { mockConfigService } from './config.mock';
import { ConfigService } from '@nestjs/config';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;

  beforeAll(async () => {
    await testMongoConfig.setUp();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

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

  function createUserData(overrides: Partial<User> = {}) {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      role: Roles.USER,
      status: UserStatus.ACTIVE,
      organizationId: new mongoose.Types.ObjectId(),
      ...overrides,
    };
  }

  async function createUser(overrides: Partial<User> = {}): Promise<User> {
    const userData = createUserData(overrides);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await userModel.create({ ...userData, password: hashedPassword });
  }

  it('/auth/login (POST) 200', async () => {
    const userData = createUserData();
    await createUser(userData);

    const loginPayload = {
      email: userData.email,
      password: userData.password,
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginPayload)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
    expect(response.body.access_token).toBeTruthy();
  });

  describe('/auth/login (POST) 400 - Validation errors', () => {
    const validationTestCases = [
      {
        description: 'should return validation error for invalid email',
        payload: {
          email: faker.lorem.word(),
          password: faker.internet.password({ length: 12 }),
        },
        expectedMessage: VALIDATION_MESSAGES.EMAIL.INVALID,
      },
      {
        description: 'should return validation error for short password',
        payload: {
          email: faker.internet.email(),
          password: faker.internet.password({ length: 3 }),
        },
        expectedMessage: VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH,
      },
      {
        description: 'should return validation error for long password',
        payload: {
          email: faker.internet.email(),
          password: faker.string.alphanumeric(25),
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

  it('/auth/login (POST) 404 - User not found', async () => {
    const loginPayload = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('User not found');
    expect(response.body).not.toHaveProperty('access_token');
  });

  it('/auth/login (POST) 401 - Wrong password', async () => {
    const userData = createUserData();
    await createUser(userData);

    const loginPayload = {
      email: userData.email,
      password: faker.internet.password({ length: 12 }),
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid credentials');
    expect(response.body).not.toHaveProperty('access_token');
  });

  it('/auth/login (POST) 401 - Blocked user', async () => {
    const userData = createUserData({ status: UserStatus.BLOCKED });
    await createUser(userData);

    const loginPayload = {
      email: userData.email,
      password: userData.password,
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Account is blocked');
    expect(response.body).not.toHaveProperty('access_token');
  });
});
