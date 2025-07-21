import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { AssertHasRole } from './types';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async assertHasRole({ userId, role, message = 'Access denied' }: AssertHasRole) {
    const user = await this.userModel
      .findOne({ _id: { $eq: userId }, role })
      .select('_id')
      .lean();

    if (!user) {
      throw new ForbiddenException(message);
    }
  }
}
