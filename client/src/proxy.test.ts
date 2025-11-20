import { NextRequest } from 'next/server';
import { ActiveLanguage } from './types';
import { cookiesLocale, routes } from './constants';
import { proxy } from './proxy';

describe('Proxy', () => {
  const validId = '507f1f77bcf86cd799439011';
  const invalidId = 'invalid-id';

  const createRequest = (pathname: string = '/', cookies: Record<string, string> = {}) => {
    const cookiesMap = new Map(Object.entries(cookies).map(([k, v]) => [k, { value: v }]));

    return {
      cookies: {
        get: (key: string) => cookiesMap.get(key),
        set: jest.fn(),
      },
      nextUrl: {
        pathname,
        clone: () => ({ pathname }),
      },
      url: `http://localhost:3000${pathname}`,
    } as unknown as NextRequest;
  };

  const expectRedirect = (response: Response, targetPath: string) => {
    expect(response.headers.get('Location')).toBe(targetPath);
    expect(response.status).toBe(307);
  };

  const expectNoRedirect = (response: Response) => {
    expect(response.status).toBe(200);
    expect(response.headers.get('Location')).toBeNull();
  };

  describe('Locale handling', () => {
    test('sets default locale when not present', async () => {
      const request = createRequest('/');
      const response = await proxy(request);

      expect(request.cookies.set).toHaveBeenCalledWith(cookiesLocale, ActiveLanguage.UA);
      expectNoRedirect(response);
    });

    test('preserves existing locale', async () => {
      const request = createRequest('/', { [cookiesLocale]: ActiveLanguage.EN });
      const response = await proxy(request);

      expect(request.cookies.set).not.toHaveBeenCalled();
      expectNoRedirect(response);
    });
  });

  describe('Navigation handling', () => {
    test.each([
      { path: routes.requests, id: invalidId, target: routes.login },
      { path: routes.login, id: validId, target: routes.requests },
    ])('redirects from $path to $target', async ({ path, id, target }) => {
      const request = createRequest(path, { id });
      const response = await proxy(request);

      expectRedirect(response, target);
    });

    test.each([
      { path: routes.requests, id: validId },
      { path: routes.login, id: invalidId },
    ])('allows access to $path', async ({ path, id }) => {
      const request = createRequest(path, { id });
      const response = await proxy(request);

      expectNoRedirect(response);
    });
  });

  describe('ObjectId validation', () => {
    const validIds = ['507f1f77bcf86cd799439011', '000000000000000000000000', 'ffffffffffffffffffffffff'];
    const invalidIds = [
      '',
      'invalid',
      '507f1f77bcf86cd7994390',
      '507f1f77bcf86cd79943901111',
      '507f1f77bcf86cd7994390xx',
    ];

    test.each(validIds)('valid ObjectId %s redirects from login to requests', async (id) => {
      const request = createRequest(routes.login, { id });
      const response = await proxy(request);

      expectRedirect(response, routes.requests);
    });

    test.each(invalidIds)('invalid ObjectId %s redirects from requests to login', async (id) => {
      const request = createRequest(routes.requests, { id });
      const response = await proxy(request);

      expectRedirect(response, routes.login);
    });
  });
});
