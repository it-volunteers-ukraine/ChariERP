import connectDB from '../db';

export class BaseService {
  protected async connect() {
    await connectDB();
  }
}
