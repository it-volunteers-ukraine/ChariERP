import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { FeedbackModule } from './feedback/feedback.module';
import { AssetModule } from './fixed-asset/asset.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env.development.local', '.env.production.local', '.env'],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    AuthModule,
    UserModule,
    TaskModule,
    AssetModule,
    FeedbackModule,
  ],
})
export class AppModule {}
