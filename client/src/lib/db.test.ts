import connectDB from '@/lib/db';
import mongoose, { ConnectionStates } from 'mongoose';
import { faker } from '@faker-js/faker';

jest.mock('mongoose');

describe('Database connection test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const okState = { ok: 1 };
  const mockAdminCommand: jest.Mock<Document, never[], Promise<Document>> = jest.fn().mockResolvedValue(okState);

  const mockMongooseConnection = (connectionState: ConnectionStates) => {
    Object.defineProperty(mongoose, 'connection', {
      get: () => ({
        readyState: connectionState,
        db: {
          admin: () => ({
            command: mockAdminCommand,
          }),
        },
      }),
      configurable: true,
    });
  };

  it('should throw Error when MONGO_URI is blank', async () => {
    delete process.env.MONGO_URI;

    Object.defineProperty(mongoose, 'connection', {
      get: () => ({
        readyState: mongoose.ConnectionStates.disconnected,
        db: undefined,
      }),
      configurable: true,
    });

    const expectedErrorMessage = 'Please define the MONGO_URI environment variable inside .env';
    const actual = async () => await connectDB();

    await expect(actual).rejects.toThrow(expectedErrorMessage);
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });

  it('should return Promise.resolve({success: true}) when Mongoose is already connected', async () => {
    process.env.MONGO_URI = `mongodb://${faker.internet.domainName()}:${faker.internet.port()}/test-db`;
    mockMongooseConnection(ConnectionStates.connected);

    const actual = connectDB();

    await expect(actual).resolves.toStrictEqual({ success: true });
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });

  it('should provide "success" status and new connection when it was disconnected', async () => {
    process.env.MONGO_URI = `mongodb://${faker.internet.domainName()}:${faker.internet.port()}/test-db`;
    mockMongooseConnection(ConnectionStates.disconnected);

    const actual = await connectDB();

    expect(actual).toStrictEqual({ success: true, document: okState });
    expect(mockAdminCommand).toHaveBeenCalled();
  });

  it('should log and wrap error when connection cannot be established', async () => {
    process.env.MONGO_URI = faker.lorem.word(); // Invalid connection string

    Object.defineProperty(mongoose, 'connection', {
      get: () => ({
        readyState: ConnectionStates.disconnected,
      }),
    });

    const mockError = new Error(faker.lorem.sentence());

    (mongoose.connect as jest.Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    const actual = await connectDB();

    expect(actual).toStrictEqual({ error: mockError });
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });
});
