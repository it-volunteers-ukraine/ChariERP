import '@testing-library/jest-dom';
import { NextURL } from 'next/dist/server/web/next-url';
import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

// Mock the serializer to prevent it from importing UI components
jest.mock('@/utils/serializer', () => ({
  userSerializer: jest.fn((user) => user),
  organizationSerializer: jest.fn((org) => org),
  taskSerializer: jest.fn((task) => task),
  boardSerializer: jest.fn((board) => board),
}));

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

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
  useFormatter: () => ({
    dateTime: (date: Date) => date.toISOString(),
    number: (num: number) => num.toString(),
  }),
}));

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
