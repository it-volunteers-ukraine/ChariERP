import bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserStatus } from '../schemas/enums';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async login(loginDto: UserLoginDto): Promise<IUser> {
    const user = await this.userModel.findOne({ email: loginDto.email }).exec();

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

    const updatedUser = await this.userModel.findByIdAndUpdate(
      user._id,
      {
        $set: { lastLogin: new Date() },
      },
      { new: true },
    );

    console.info(`User '${updatedUser!._id}' successfully signed in`);
    return updatedUser!.toObject();
  }
}
