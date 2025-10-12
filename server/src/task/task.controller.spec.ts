import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { Roles } from '../schemas/enums';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserService } from '../user/user.service';
import { CreateTaskRequest } from './dto/create-task.request';
import { AuthGuard } from '../auth/auth.guard';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            assertHasRole: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
    userService = module.get<UserService>(UserService);
  });

  const dto: CreateTaskRequest = {
    userId: 'user123',
    columnId: 'column456',
  };

  it('should call assertHasRole and createTask, then return task ID', async () => {
    const expectedId = { id: 'task789' };
    jest.spyOn(taskService, 'createTask').mockResolvedValue(expectedId);

    const result = await taskController.createTask(dto);

    expect(userService.assertHasRole).toHaveBeenCalledWith({
      userId: dto.userId,
      role: Roles.MANAGER,
      message: 'Only managers can create tasks',
    });

    expect(taskService.createTask).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedId);
  });

  it('should throw ForbiddenException if user is not a manager', async () => {
    jest
      .spyOn(userService, 'assertHasRole')
      .mockRejectedValue(new ForbiddenException('Only managers can create tasks'));

    await expect(taskController.createTask(dto)).rejects.toThrow(ForbiddenException);
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(userService, 'assertHasRole').mockRejectedValue(new NotFoundException('User not found'));

    await expect(taskController.createTask(dto)).rejects.toThrow(NotFoundException);
    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('should throw generic error if taskService fails', async () => {
    jest.spyOn(taskService, 'createTask').mockRejectedValue(new Error('Unexpected error'));

    const mockAssert = jest.spyOn(userService, 'assertHasRole').mockResolvedValue(undefined);

    await expect(taskController.createTask(dto)).rejects.toThrow('Unexpected error');

    expect(mockAssert).toHaveBeenCalled();
  });
});
