import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { VALIDATION_MESSAGES } from '../src/constants/validation-messages';
import { IUser } from '../src/auth/interfaces/user.interface';
import { AuthService } from '../src/auth/auth.service';
import { AuthModule } from '../src/auth/auth.module';

describe('AuthController (e2e)', () => {
  const email = 'john.doe@company.com';
  const existingUser = {
    email: email,
    password: 'hashedPassword',
    firstName: 'John',
    lastName: 'Doe',
    status: 'ACTIVE',
  } as unknown as IUser;

  const authService = { login: () => existingUser };
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) 200', () => {
    const loginPayload = { email: email, password: 'SecurePass123!' };
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(loginPayload)
      .expect(HttpStatus.OK)
      .expect(({ body }) => expect(body).toEqual(existingUser));
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
