import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBoard } from './dto/board-create.request';
import { Board, BoardDocument } from 'src/schemas/board.schemas';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}

  async create(createBoard: CreateBoard): Promise<BoardDocument> {
    const createdBoard = new this.boardModel(createBoard);
    return createdBoard.save();
  }

  async findAll(): Promise<BoardDocument[]> {
    return this.boardModel.find().exec();
  }
}
