import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '../service/app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get hello message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a hello message',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Hello World!',
        },
      },
    },
  })
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }
}
