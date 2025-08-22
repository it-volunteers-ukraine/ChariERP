import { AuthGuard} from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockJwtService: {verifyAsync: jest.Mock};
  let mockReflector: {getAllAndOverride: jest.Mock};

  const VALID_TOKEN = 'valid';
  const INVALID_TOKEN = 'invalid';

  const commonContextMethods = {
    getHandler: () => ({}),
    getClass: () => ({})
  };

    beforeEach(() => {
    mockJwtService = {verifyAsync: jest.fn()};
    mockReflector = {getAllAndOverride: jest.fn()};
    guard = new AuthGuard(mockJwtService as any, mockReflector as any);
  });
   function expectJwtNotCalled () {
      expect(mockJwtService.verifyAsync).not.toHaveBeenCalled();
    }
  it('should allow access if route is public', async () => {
   mockReflector.getAllAndOverride.mockReturnValue(true);
   const mockContext: any = {
    ...commonContextMethods
   };
    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expectJwtNotCalled();
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    const mockContext: any = {
      ...commonContextMethods,
      switchToHttp: () => ({
        getRequest: () => ({headers: {}}),
      }),
   };
    await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
    expectJwtNotCalled();
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid'));
    const mockContext: any = {
      ...commonContextMethods,
      switchToHttp: () => ({
        getRequest: () => ({headers: {authorization: `Bearer ${INVALID_TOKEN} token`}}),
      }),
   };
    
    await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(INVALID_TOKEN, expect.any(Object));
  });

  it('should allow access if token is valid', async () => {
    const mockUser = {id:1}
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockResolvedValue(mockUser);

    const mockContext: any = {
      ...commonContextMethods,
      switchToHttp: () => ({
        getRequest: () => ({headers: {authorization: `Bearer ${VALID_TOKEN} token`}}),
      }),
   };
   const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith(VALID_TOKEN, expect.any(Object));
  });
});