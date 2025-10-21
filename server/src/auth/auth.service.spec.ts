import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserLoginRequest } from './dto/user-login.request';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Roles, UserStatus } from '../schemas/enums';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let userModel: any;
  let jwtService: JwtService;

  const mockUser = {
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatarUrl: faker.image.avatar(),
    password: faker.internet.password(),
    lastLogin: faker.date.past(),
    status: UserStatus.ACTIVE,
    role: Roles.USER,
  };

  beforeEach(async () => {
    const mockUserModel = {
      findOne: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userModel = module.get(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should log in a user with valid credentials and return access token', async () => {
    const loginDto: UserLoginRequest = {
      email: 'test@example.com',
      password: 'password',
    };

    const mockToken = faker.internet.jwt({ header: { alg: 'HS256' } });
    userModel.exec.mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    userModel.findByIdAndUpdate.mockResolvedValue({});
    (jwtService.signAsync as jest.Mock).mockResolvedValue(mockToken);

    const result = await authService.login(loginDto);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: { $eq: loginDto.email } });
    expect(userModel.lean).toHaveBeenCalled();
    expect(userModel.exec).toHaveBeenCalled();
    expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, { lastLogin: expect.any(Date) });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: mockUser._id,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      avatar: mockUser.avatarUrl,
      lastLogin: mockUser.lastLogin,
      role: mockUser.role,
    });
    expect(result).toEqual({ access_token: mockToken });
  });

  it('should throw NotFoundException if the user does not exist', async () => {
    const loginDto: UserLoginRequest = {
      email: 'nonexistent@example.com',
      password: 'password',
    };

    userModel.exec.mockResolvedValue(null);

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
      (bcrypt.compare as jest.Mock).mockResolvedValue(bcryptResult);

      await expect(authService.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
