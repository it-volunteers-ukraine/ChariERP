import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { TaskService } from './task.service';
import { Task } from '@/schemas/task.schema';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskModel: any;

  beforeEach(async () => {
    const mockTaskModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskModel = module.get(getModelToken(Task.name));
  });

  it('should create a task and return its id', async () => {
    const dto = {
      userId: faker.database.mongodbObjectId(),
      columnId: faker.database.mongodbObjectId(),
    };

    const mockCreatedTask = {
      _id: {
        toString: () => 'mocked-id',
      },
    };

    taskModel.create.mockResolvedValue(mockCreatedTask);

    const result = await taskService.createTask(dto);

    expect(taskModel.create).toHaveBeenCalledWith({
      title: 'New Task',
      assignees: [new Types.ObjectId(dto.userId)],
      activeColumn: new Types.ObjectId(dto.columnId),
    });

    expect(result).toEqual({ id: 'mocked-id' });
  });

  it('should throw an error if task creation fails', async () => {
    const dto = {
      userId: faker.database.mongodbObjectId(),
      columnId: faker.database.mongodbObjectId(),
    };

    taskModel.create.mockRejectedValue(new Error('Database error'));

    await expect(taskService.createTask(dto)).rejects.toThrow('Database error');
  });
});
