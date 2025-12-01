import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { CreateTaskRequest } from './dto/create-task.request';
import { Task } from '@/schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  public async createTask(createTaskDto: CreateTaskRequest): Promise<{ id: string }> {
    const task = await this.taskModel.create({
      title: 'New Task',
      assignees: [new Types.ObjectId(createTaskDto.userId)],
      activeColumn: new Types.ObjectId(createTaskDto.columnId),
      //TODO: add board ID
    });

    return { id: task._id.toString() };
  }
}
