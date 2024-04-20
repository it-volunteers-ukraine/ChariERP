import handler from './hello';
import { NextApiRequest, NextApiResponse } from 'next';

const mockedRequest: jest.Mocked<NextApiRequest> =
  {} as unknown as jest.Mocked<NextApiRequest>;
const mockedResponse: jest.Mocked<NextApiResponse> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as jest.Mocked<NextApiResponse>;

describe('Handler', () => {
  it('should return preset OK response with data', () => {
    handler(mockedRequest, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(200);
    expect(mockedResponse.json).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
