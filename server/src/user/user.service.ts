import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { Roles, User } from 'src/schemas';
import { AssertHasRole } from './types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async assertHasRole({ userId, role, message = 'Access denied' }: AssertHasRole) {
    const user = await this.userModel.findOne({ _id: userId, role }).select('_id').lean();

    if (!user) {
      throw new ForbiddenException(message);
    }
  }

  public async findOrgIdByUserId({ userId }): Promise<string> {
    const user = await this.userModel
      .findOne({ _id: userId, role: Roles.MANAGER })
      .select(['organizationId', 'role'])
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.organizationId.toString();
  }
}
