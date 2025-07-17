import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResponse, CreateBoardDto, UpdateBoardDto } from './dto/board-create.request';
import {
  ApiBody,
  ApiTags,
  ApiParam,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@ApiTags('Boards')
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all boards' })
  @ApiOkResponse({ type: [BoardResponse] })
  async findAll(): Promise<BoardResponse[]> {
    const boards = await this.boardService.findAll();

    return boards.map((board) => ({
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a board by ID' })
  @ApiParam({ name: 'id', description: 'ID board' })
  @ApiOkResponse({ type: BoardResponse })
  @ApiNotFoundResponse({ description: 'Board not found' })
  async findOne(@Param('id') id: string): Promise<BoardResponse> {
    const board = await this.boardService.findById(id);
    if (!board) throw new NotFoundException('Board not found');
    return {
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new board' })
  @ApiCreatedResponse({ type: BoardResponse })
  @ApiBody({ type: CreateBoardDto })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoardDto): Promise<BoardResponse> {
    const organizationId = await this.userService.findOrgIdByUserId({ userId: createBoardDto.userId });
    const board = await this.boardService.create({ organizationId, ...createBoardDto });

    return {
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Refresh your board' })
  @ApiParam({ name: 'id', description: 'ID board' })
  @ApiOkResponse({ type: BoardResponse })
  @ApiBadRequestResponse({ description: 'Incorrect data' })
  @ApiNotFoundResponse({ description: 'Board not found' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateBoardDto): Promise<BoardResponse> {
    const board = await this.boardService.update(id, updateDto);
    if (!board) throw new NotFoundException('Board not found');

    return {
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete board' })
  @ApiParam({ name: 'id', description: 'ID board' })
  @ApiOkResponse({ description: 'Board deleted' })
  @ApiNotFoundResponse({ description: 'Board not found' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.boardService.delete(id);
    if (!deleted) throw new NotFoundException('Board not found');
    return { message: 'Board successfully deleted' };
  }
}
