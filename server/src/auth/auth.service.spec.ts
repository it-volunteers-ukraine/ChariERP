import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserLoginRequest } from './dto/user-login.request';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserStatus } from '../schemas/enums';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;

  const mockUser = {
    _id: 'userId1',
    email: 'test@example.com',
    password: 'hashedPassword',
    status: UserStatus.ACTIVE,
  };

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should log in a user with valid credentials', async () => {
    const loginDto: UserLoginRequest = {
      email: 'test@example.com',
      password: 'password',
    };

    userModel.exec.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    userModel.findByIdAndUpdate.mockResolvedValue({});

    const result = await authService.login(loginDto);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: { $eq: loginDto.email } });
    expect(userModel.lean).toHaveBeenCalled();
    expect(userModel.exec).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { lastLogin: expect.any(Date) });
    expect(result).toEqual({ ...mockUser, lastLogin: expect.any(Date) });
  });

  it('should throw NotFoundException if the user does not exist', async () => {
    const loginDto: UserLoginRequest = {
      email: 'nonexistent@example.com',
      password: 'password',
    };

    userModel.exec.mockResolvedValue(null);

    // when & then
    await expect(authService.login(loginDto)).rejects.toThrow(NotFoundException);
  });

  describe('should throw UnauthorizedException', () => {
    test.each([
      {
        description: 'for invalid passwords',
        user: mockUser,
        bcryptResult: false,
      },
      {
        description: 'for blocked accounts',
        user: { ...mockUser, status: UserStatus.BLOCKED },
        bcryptResult: true,
      },
    ])('$description', async ({ user, bcryptResult }) => {
      const loginDto: UserLoginRequest = {
        email: 'test@example.com',
        password: 'password',
      };

      userModel.exec.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(bcryptResult as never);

      // when & then
      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
