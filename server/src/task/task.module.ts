import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';

import { TaskController } from './task.controller';
import { Task, TaskSchema } from '../schemas/task.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
