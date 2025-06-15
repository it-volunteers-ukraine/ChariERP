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
} from '@nestjs/swagger';

import { CreateTaskRequest } from './dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
    return await this.taskService.createTask(createTaskRequest);
  }
}
