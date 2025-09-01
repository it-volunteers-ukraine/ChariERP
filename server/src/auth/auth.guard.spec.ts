import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockJwtService: { verifyAsync: jest.Mock };
  let mockReflector: { getAllAndOverride: jest.Mock };

  const VALID_TOKEN = 'valid';
  const INVALID_TOKEN = 'invalid';

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
  function expectJwtNotCalled() {
    expect(mockJwtService.verifyAsync).not.toHaveBeenCalled();
  }
  function makeAuthContext(token?: string) {
    return makeContext(token ? { authorization: `Bearer ${token}` } : {});
  }

  beforeEach(() => {
    mockJwtService = { verifyAsync: jest.fn() };
    mockReflector = { getAllAndOverride: jest.fn() };
    guard = new AuthGuard(mockJwtService as any, mockReflector as any);
  });

  it('should allow access if route is public', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(true);

    const ctx = makeContext();
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);
    expectJwtNotCalled();
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);

    const ctx = makeAuthContext();
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    expectJwtNotCalled();
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid'));

    const ctx = makeAuthContext(INVALID_TOKEN);
    await expect(guard.canActivate(ctx)).rejects.toThrow(UnauthorizedException);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
      INVALID_TOKEN,
      expect.objectContaining({ secret: expect.any(String) }),
    );
  });

  it('should allow access if token is valid and attach user to request', async () => {
    const mockUser = { id: faker.database.mongodbObjectId() };
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockResolvedValue(mockUser);

    const ctx = makeAuthContext(VALID_TOKEN);
    const result = await guard.canActivate(ctx);
    expect(result).toBe(true);

    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(
      VALID_TOKEN,
      expect.objectContaining({ secret: expect.any(String) }),
    );
    const req = ctx.switchToHttp().getRequest();
    expect(req.user).toEqual(mockUser);
  });
});
