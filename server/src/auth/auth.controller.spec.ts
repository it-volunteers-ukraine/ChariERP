import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IUser } from './interfaces/user.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return existing user', async () => {
      const loginRequest = { email: 'john.doe@company.com', password: 'SecurePass123!' };
      const existingUser = {
        _id: '507f1f77bcf86cd799439011',
        email: 'john.doe@company.com',
        password: 'hashedPassword',
        firstName: 'John',
        lastName: 'Doe',
        status: 'ACTIVE',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(authService, 'login').mockResolvedValue(existingUser as unknown as IUser);

      const result = await authController.login(loginRequest);
      expect(result).toBe(existingUser);
      expect(authService.login).toHaveBeenCalledWith(loginRequest);
    });
  });
});
