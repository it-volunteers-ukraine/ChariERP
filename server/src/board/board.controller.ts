import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResponse, CreateBoard } from './dto/board-create.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async findAll(): Promise<BoardResponse[]> {
    const boards = await this.boardService.findAll();

    return boards.map((board) => ({
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    }));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoard): Promise<BoardResponse> {
    const board = await this.boardService.create(createBoardDto);

    return {
      id: board._id.toString(),
      title: board.title,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
    };
  }
}
