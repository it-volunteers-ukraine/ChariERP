import * as bcrypt from 'bcrypt';
import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserStatus } from '../schemas/enums';
import { UserLoginRequest } from './dto/user-login.request';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async login(loginDto: UserLoginRequest): Promise<{ access_token: string }> {
    const maskedEmail = (loginDto.email || '').replace(/(^[^@]?)[^@]*(@.*$)/, '$1***$2');
    this.logger.log(`Login attempt for email: ${maskedEmail}`);

    const user = await this.userModel
      .findOne({ email: { $eq: loginDto.email } })
      .lean()
      .exec();

    if (!user) {
      this.logger.warn(`Login failed: user not found for email: ${maskedEmail}`);
      throw new NotFoundException('User not found');
    }

    const compare = await bcrypt.compare(loginDto.password, user.password);

    if (!compare) {
      this.logger.warn(`Login failed: invalid credentials for email: ${maskedEmail}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === UserStatus.BLOCKED) {
      this.logger.warn(`Attempt to sign in with blocked account for user: ${user._id}`);
      throw new UnauthorizedException('Account is blocked');
    }

    await this.userModel.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    this.logger.log(`User '${user._id}' successfully signed in`);
    const payload = {
      sub: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatarUrl,
      lastLogin: user.lastLogin,
      role: user.role,
      organizationId: user.organizationId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
