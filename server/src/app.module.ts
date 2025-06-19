import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskModule } from './task';
import { UserModule } from './user';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env', '.env.production.local', '.env.development.local'],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    AuthModule,
    BoardModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
