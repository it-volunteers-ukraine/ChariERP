import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResponse, CreateBoard } from './dto/board-create.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

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
