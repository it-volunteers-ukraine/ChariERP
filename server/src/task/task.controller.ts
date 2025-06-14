import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
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
  @ApiResponse({
    status: 201,
    description: 'Task successfully created',
    schema: { example: { id: '664fd1b5c6b3f73c276d3a21' } },
  })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiResponse({ status: 403, description: 'Only managers can create task' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async createTask(@Body() createTaskRequest: CreateTaskRequest): Promise<{ id: string }> {
    return await this.taskService.createTask(createTaskRequest);
  }
}
