import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';
import { cookiesLocale, routes } from '@/constants';
import { ActiveLanguage } from '@/types';
import mongoose from 'mongoose';

describe('Middleware configuration test', () => {
  it("should set default 'UA' locale into cookies once absent and init response with defaults", async () => {
    const request = new NextRequest(URL.parse('http://localhost')!);

    expect(request.cookies.get(cookiesLocale)?.value).toBeUndefined();

    const response = await middleware(request);

    expect(request.cookies.get(cookiesLocale)?.value).toBe(ActiveLanguage.UA);
    expect(response).toBeDefined();
    expect(response.status).toBe(200);
  });

  it.each([
    { initialRoute: routes.login, id: new mongoose.Types.ObjectId().toHexString(), expectedRoute: routes.requests },
    { initialRoute: routes.requests, id: '12345', expectedRoute: routes.login },
  ])(
    "should redirect to '$expectedRoute' once request contains ID '$id' and '$initialRoute' route",
    async ({ initialRoute, id, expectedRoute }) => {
      const request = new NextRequest(URL.parse(`http://localhost${initialRoute}`)!);

      request.cookies.set('id', id);
      request.cookies.set(cookiesLocale, ActiveLanguage.EN);

      const response = await middleware(request);

      expect(request.cookies.get(cookiesLocale)?.value).toBe(ActiveLanguage.EN);
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain(expectedRoute);
    },
  );
});
