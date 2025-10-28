import { getModelToken } from '@nestjs/mongoose';
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { Roles } from '@/schemas/enums';
import { UserService } from './user.service';
import { User } from '@/schemas/user.schema';

describe('UserService', () => {
  let userService: UserService;

  const mockUserModel = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not throw if user with required role is found', async () => {
    mockUserModel.findOne.mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue({ _id: 'user123' }),
    });

    await expect(
      userService.assertHasRole({
        userId: 'user123',
        role: Roles.MANAGER,
      }),
    ).resolves.not.toThrow();
  });

  it('should throw ForbiddenException if user not found or role mismatched', async () => {
    mockUserModel.findOne.mockReturnValueOnce({
      select: jest.fn().mockReturnThis(),
      lean: jest.fn().mockResolvedValue(null),
    });

    await expect(
      userService.assertHasRole({
        userId: 'user123',
        role: Roles.MANAGER,
        message: 'Only managers allowed',
      }),
    ).rejects.toThrow(ForbiddenException);
  });
});
