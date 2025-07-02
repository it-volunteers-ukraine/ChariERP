import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Tasks, TaskSchema } from 'src/schemas/task.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tasks.name, schema: TaskSchema }]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
