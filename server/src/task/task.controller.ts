import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';

import { TaskService } from './task.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Get all tasks with full info' })
  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @ApiOperation({ summary: 'Get all tasks preview (short data)' })
  @Get('preview')
  async getAllPreview() {
    return 'Get all task preview';
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return 'Delete task by id: ' + id;
  }

  @ApiOperation({ summary: 'Update task title' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Patch(':id/title')
  async updateTitle(@Param('id') id: string, @Body('title') title: string) {
    return 'Update task title for id: ' + id + ' to ' + title;
  }

  @ApiOperation({ summary: 'Add participant to task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Patch(':id/participants/add')
  async addParticipant(@Param('id') id: string, @Body('userId') userId: string) {
    return 'Add participant to task with id: ' + id + ' and userId: ' + userId;
  }

  @ApiOperation({ summary: 'Remove participant from task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Patch(':id/participants/remove')
  async removeParticipant(@Param('id') id: string, @Body('userId') userId: string) {
    return 'Remove participant from task with id: ' + id + ' and userId: ' + userId;
  }
}
