import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UserLoginRequest } from './dto/user-login.request';
import { UserStatus } from '../schemas/enums';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  const createMockUser = async (email: string, password: string, status: UserStatus = UserStatus.ACTIVE) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return {
      _id: 'userId1',
      email,
      password: hashedPassword,
      status,
      toObject: jest.fn().mockReturnValue({
        _id: 'userId1',
        email,
        status,
      }),
    };
  };

  const setupUserModelMocks = (mockUser: any = null) => {
    jest.spyOn(userModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as any);
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(mockUser);
  };

  const setupBcryptMock = (shouldMatch: boolean) => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(shouldMatch));
  };

  it('should log in a user with valid credentials', async () => {
    // given
    const loginDto: UserLoginRequest = {
      email: 'valid.user@example.com',
      password: 'SecurePass123!',
    };
    const mockUser = await createMockUser(loginDto.email, loginDto.password);

    setupUserModelMocks(mockUser);
    setupBcryptMock(true);

    // when
    const result = await authService.login(loginDto);

    // then
    expect(result).toEqual({
      _id: 'userId1',
      email: loginDto.email,
      status: UserStatus.ACTIVE,
    });
  });

  it('should throw NotFoundException if the user does not exist', async () => {
    // given
    const loginDto: UserLoginRequest = {
      email: 'nonexistent.user@example.com',
      password: 'WrongPass123!',
    };
    setupUserModelMocks();

    // when & then
    await expect(authService.login(loginDto)).rejects.toThrow(NotFoundException);
  });

  describe('should throw UnauthorizedException', () => {
    const unauthorizedTestCases = [
      {
        description: 'for invalid passwords',
        loginDto: {
          email: 'valid.user@example.com',
          password: 'WrongPass123!',
        },
        userPassword: 'ValidPass123!',
        status: UserStatus.ACTIVE,
        shouldPasswordMatch: false,
      },
      {
        description: 'for blocked accounts',
        loginDto: {
          email: 'blocked.user@example.com',
          password: 'SecurePass123!',
        },
        userPassword: 'SecurePass123!',
        status: UserStatus.BLOCKED,
        shouldPasswordMatch: true,
      },
    ];

    test.each(unauthorizedTestCases)(
      '$description',
      async ({ loginDto, userPassword, status, shouldPasswordMatch }) => {
        // given
        const mockUser = await createMockUser(loginDto.email, userPassword, status);

        setupUserModelMocks(mockUser);
        setupBcryptMock(shouldPasswordMatch);

        // when & then
        await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
      }
    );
  });
});