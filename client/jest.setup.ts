import '@testing-library/jest-dom';
import { NextURL } from 'next/dist/server/web/next-url';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

// Mock next-intl middleware
jest.mock('next-intl/middleware', () => {
  const mockMiddleware = () => ({
    headers: new Headers(),
    status: 200,
  });

  return {
    __esModule: true,
    default: function createMiddleware() {
      return mockMiddleware;
    },
  };
});

// Mock next/server
jest.mock('next/server', () => ({
  NextResponse: {
    redirect: (url: NextURL) => ({
      headers: new Headers([['Location', url.pathname]]),
      status: 307,
    }),
  },
}));

jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({
          data: { success: true },
          error: null,
        }),
      },
    })),
  };
});
