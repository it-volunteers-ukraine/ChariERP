import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserStatus } from '../schemas/enums';
import { UserLoginRequest } from './dto/user-login.request';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async login(loginDto: UserLoginRequest): Promise<IUser> {
    const user = await this.userModel
      .findOne({ email: { $eq: loginDto.email } })
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const compare = await bcrypt.compare(loginDto.password, user.password);

    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === UserStatus.BLOCKED) {
      console.warn(`Attempt to sign in with blocked account for user: ${user._id}`);
      throw new UnauthorizedException('Account is blocked');
    }

    await this.userModel.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    console.info(`User '${user._id}' successfully signed in`);
    return { ...user, lastLogin: new Date() };
  }
}
