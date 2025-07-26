import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { EmailModule } from '../email/email.module';
import { AuthGuard } from '../auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EmailModule],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class FeedbackModule {}
