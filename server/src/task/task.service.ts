import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskRequest } from './dto/create-task.request';
import { Tasks } from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>) {}

  public async createTask(createTaskDto: CreateTaskRequest): Promise<{ id: string }> {
    const task = await this.taskModel.create({
      title: 'New Task',
      users: [createTaskDto.userId],
      columnId: createTaskDto.columnId,
    });

    //TODO: add task id to column

    return { id: task._id.toString() };
  }
}
