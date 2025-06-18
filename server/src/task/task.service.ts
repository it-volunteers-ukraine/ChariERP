import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { Tasks } from 'src/schemas';
import { CreateTaskRequest } from './dto';

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
