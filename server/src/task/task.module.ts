import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Tasks, TaskSchema, User, UserSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Tasks.name, schema: TaskSchema },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
