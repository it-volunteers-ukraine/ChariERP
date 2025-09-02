import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockJwtService: { verifyAsync: jest.Mock };
  let mockReflector: { getAllAndOverride: jest.Mock };

  const VALID_TOKEN = faker.internet.jwt({ header: { alg: 'HS256' } });
  const INVALID_TOKEN = 'invalid';
  const MOCK_USER = { id: faker.database.mongodbObjectId() };

  function makeContext(
    headers: Record<string, string> = {},
    overrides: Partial<ExecutionContext> = {},
  ): ExecutionContext {
    const req: any = { headers };
    return {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => req,
      }),
      ...overrides,
    } as unknown as ExecutionContext;
  }

  function makeAuthContext(token?: string) {
    return makeContext(token ? { authorization: `Bearer ${token}` } : {});
  }

  beforeEach(() => {
    mockJwtService = { verifyAsync: jest.fn() };
    mockReflector = { getAllAndOverride: jest.fn() };
    guard = new AuthGuard(mockJwtService as any, mockReflector as any);
  });

  describe('should throw UnauthorizedException', () => {
    beforeEach(() => {
      mockReflector.getAllAndOverride.mockReturnValue(false);
    });

    it('when token is missing', async () => {
      const ctx = makeAuthContext();

      const actual = guard.canActivate(ctx);

      await expect(actual).rejects.toThrow(UnauthorizedException);
      expect(mockJwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('when token is invalid', async () => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid'));
      const ctx = makeAuthContext(INVALID_TOKEN);

      const actual = guard.canActivate(ctx);

      await expect(actual).rejects.toThrow(UnauthorizedException);
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
        INVALID_TOKEN,
        expect.objectContaining({ secret: expect.any(String) }),
      );
    });
  });

  describe('should allow access ', () => {
    it('when route is public', async () => {
      mockReflector.getAllAndOverride.mockReturnValue(true);
      const ctx = makeContext();

      const actual = await guard.canActivate(ctx);

      expect(actual).toBeTruthy();
      expect(mockJwtService.verifyAsync).not.toHaveBeenCalled();
    });

    it('when token is valid and attach user to request', async () => {
      mockReflector.getAllAndOverride.mockReturnValue(false);
      mockJwtService.verifyAsync.mockResolvedValue(MOCK_USER);
      const ctx = makeAuthContext(VALID_TOKEN);

      const actual = await guard.canActivate(ctx);

      expect(actual).toBeTruthy();
      expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
        VALID_TOKEN,
        expect.objectContaining({ secret: expect.any(String) }),
      );
      const req = ctx.switchToHttp().getRequest();
      expect(req.user).toEqual(MOCK_USER);
    });
  });
});
