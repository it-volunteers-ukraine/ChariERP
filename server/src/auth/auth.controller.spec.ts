import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

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
    it('should return access token', async () => {
      const loginRequest = { email: 'john.doe@company.com', password: 'SecurePass123!' };
      const expectedResponse = { access_token: 'mock-jwt-token' };

      jest.spyOn(authService, 'login').mockResolvedValue(expectedResponse);

      const result = await authController.login(loginRequest);

      expect(result).toEqual(expectedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginRequest);
    });
  });
});
