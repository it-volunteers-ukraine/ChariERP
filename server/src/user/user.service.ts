import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from 'src/schemas';
import { AssertHasRole } from './types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async assertHasRole({ userId, role, message = 'Access denied' }: AssertHasRole) {
    const user = await this.userModel.findById(userId).select('role').lean().exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (role) {
      if (user.role !== role) {
        throw new ForbiddenException(message);
      }
    }
  }
}
