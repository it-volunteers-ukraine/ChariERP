import { AuthGuard} from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockJwtService: {verifyAsync: jest.Mock};
  let mockReflector: {getAllAndOverride: jest.Mock};

  const commonContextMethods = {
    getHandler: () => ({}),
    getClass: () => ({})
  };

    beforeEach(() => {
    mockJwtService = {verifyAsync: jest.fn()};
    mockReflector = {getAllAndOverride: jest.fn()};
    guard = new AuthGuard(mockJwtService as any, mockReflector as any);
  });


  it('should allow access if route is public', async () => {
   mockReflector.getAllAndOverride.mockReturnValue(true);
   const mockContext: any = {
    ...commonContextMethods
   };
    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
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
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockRejectedValue(new Error('invalid'));
    const mockContext: any = {
      ...commonContextMethods,
      switchToHttp: () => ({
        getRequest: () => ({headers: {authorization: 'Bearer invalid token'}}),
      }),
   };
    
    await expect(guard.canActivate(mockContext)).rejects.toThrow(UnauthorizedException);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('invalid token', expect.any(Object));
  });

  it('should allow access if token is valid', async () => {
    const mockUser = {id:1}
    mockReflector.getAllAndOverride.mockReturnValue(false);
    mockJwtService.verifyAsync.mockResolvedValue(mockUser);

    const mockContext: any = {
      ...commonContextMethods,
      switchToHttp: () => ({
        getRequest: () => ({headers: {authorization: 'Bearer valid token'}}),
      }),
   };
   const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockJwtService.verifyAsync).toHaveBeenCalledWith('valid token', expect.any(Object));
  });
});