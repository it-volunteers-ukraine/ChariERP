import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Tasks, TaskSchema, User, UserSchema } from 'src/schemas';
import { UserModule } from 'src/user';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TaskSchema }]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
