import { Module } from '@nestjs/common';
import { FeedbackModule } from './feedback/feedback.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

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
        dbName: process.env.DB_NAME,
      }),
    }),
    FeedbackModule,
  ],
})
export class AppModule {}
