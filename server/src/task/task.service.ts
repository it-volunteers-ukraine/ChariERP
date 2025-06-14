import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskRequest } from './dto';
import { Roles, Tasks, User } from 'src/schemas';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>,
  ) {}

  public async createTask(createTaskDto: CreateTaskRequest): Promise<{ id: string }> {
    const user = await this.userModel.findById(createTaskDto.userId).select('role').lean().exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== Roles.MANAGER) {
      throw new ForbiddenException('Only manager can create task');
    }

    const task = await this.taskModel.create({
      title: 'New Task',
      users: [createTaskDto.userId],
      columnId: createTaskDto.columnId,
    });

    //TODO: add task id to column

    return { id: task._id.toString() };
  }
}
