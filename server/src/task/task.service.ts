import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from 'src/user';
import { CreateTaskRequest } from './dto';
import { Roles, Tasks, User } from 'src/schemas';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Tasks.name) private readonly taskModel: Model<Tasks>,
  ) {}

  public async createTask(createTaskDto: CreateTaskRequest): Promise<{ id: string }> {
    await this.userService.assertHasRole({
      role: Roles.MANAGER,
      userId: createTaskDto.userId,
      message: 'Only managers can create tasks',
    });

    const task = await this.taskModel.create({
      title: 'New Task',
      users: [createTaskDto.userId],
      columnId: createTaskDto.columnId,
    });

    //TODO: add task id to column

    return { id: task._id.toString() };
  }
}
