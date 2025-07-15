import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  controllers: [],
  exports: [UserService],
  providers: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
})
export class UserModule {}
