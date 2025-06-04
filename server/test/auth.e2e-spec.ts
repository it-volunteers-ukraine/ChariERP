import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { App } from 'supertest/types';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IUser } from '../src/auth/interfaces/user.interface';

const existingUser = {
  email: 'john.doe@company.com',
  password: 'hashedPassword',
  firstName: 'John',
  lastName: 'Doe',
  status: 'ACTIVE',
} as unknown as IUser;

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let authService = { login: () => existingUser };

  beforeAll(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = authModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/login (POST) 200', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ email: 'john.doe@company.com', password: 'SecurePass123!' })
      .expect(HttpStatus.OK)
      .expect(({ body }) => expect(body).toEqual(existingUser));
  });
});
