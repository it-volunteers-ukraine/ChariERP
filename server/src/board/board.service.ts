import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoard } from './dto/board-create.request';
import { Board } from 'src/schemas/board.schemas';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<Board>) {}

  async create(createBoard: CreateBoard): Promise<Board> {
    const createdBoard = new this.boardModel(createBoard);
    return createdBoard.save();
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }
}
