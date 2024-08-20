import connectDB from '@/lib/db';
import mongoose, { ConnectionStates } from 'mongoose';

jest.mock('mongoose');

describe('Database connection test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const okState = { ok: 1 };
  // Mock the admin command function
  const mockAdminCommand: jest.Mock<Document, never[], Promise<Document>> = jest.fn().mockResolvedValue(okState);

  const mockMongooseConnection = (connectionState: ConnectionStates) => {
    // Mock the connection object
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
    const expectedErrorMessage = 'Please define the MONGO_URI environment variable inside .env';
    const actual = async () => await connectDB();

    await expect(actual).rejects.toThrow(expectedErrorMessage);
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });

  it('should return Promise<true> when Mongoose is already connected', async () => {
    process.env.MONGO_URI = 'mongodb://test-connection-string/';
    mockMongooseConnection(ConnectionStates.connected);

    const actual = connectDB();

    await expect(actual).resolves.toBe(true);
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });

  it('should provide new connection when it was disconnected', async () => {
    process.env.MONGO_URI = 'mongodb://test-connection-string/';
    mockMongooseConnection(ConnectionStates.disconnected);

    const actual = await connectDB();

    expect(actual).toBe(okState);
    expect(mockAdminCommand).toHaveBeenCalled();
  });

  it('should catch an Error and return the error object when connection cannot be established', async () => {
    process.env.MONGO_URI = 'wrong-connection-string';

    Object.defineProperty(mongoose, 'connection', {
      get: () => ({
        readyState: ConnectionStates.disconnected,
      }),
    });

    const mockError = new Error('Connection failed');

    (mongoose.connect as jest.Mock).mockImplementationOnce(() => {
      throw mockError;
    });

    const actual = await connectDB();

    expect(actual).toBe(mockError);
    expect(mockAdminCommand).not.toHaveBeenCalled();
  });
});
