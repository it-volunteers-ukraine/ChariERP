import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { Roles } from '../schemas/enums';
import { TaskService } from './task.service';
import { UserService } from '../user/user.service';
import { CreateTaskRequest } from './dto/create-task.request';

@ApiTags('Tasks')
@Controller('tasks')
@ApiBearerAuth()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new task' })
  @ApiBody({ type: CreateTaskRequest })
  @ApiCreatedResponse({
    description: 'Task successfully created',
    schema: { example: { id: '664fd1b5c6b3f73c276d3a21' } },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiForbiddenResponse({ description: 'Only managers can create task' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async createTask(@Body() createTaskRequest: CreateTaskRequest): Promise<{ id: string }> {
    await this.userService.assertHasRole({
      role: Roles.MANAGER,
      userId: createTaskRequest.userId,
      message: 'Only managers can create tasks',
    });

    //TODO: check if there is a column and get the board ID

    const result = await this.taskService.createTask(createTaskRequest);

    //TODO: add task id to column

    return result;
  }
}
