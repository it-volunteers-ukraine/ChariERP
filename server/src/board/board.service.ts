import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBoard, UpdateBoardDto } from './dto/board-create.request';
import { Board, BoardDocument } from 'src/schemas/board.schemas';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}

  async create(createBoard: CreateBoard): Promise<BoardDocument> {
    const createdBoard = new this.boardModel({
      ...createBoard,
      order: 0,
      boardColumns: [],
    });
    return createdBoard.save();
  }

  async findAll(): Promise<BoardDocument[]> {
    return await this.boardModel.find().exec();
  }

  async findById(id: string): Promise<BoardDocument> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');
    const board = await this.boardModel.findById(id).exec();
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<BoardDocument | null> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');

    const updatedBoard = await this.boardModel.findByIdAndUpdate(id, updateBoardDto, {
      new: true,
    });
    if (!updatedBoard) throw new NotFoundException('Board not found');

    return updatedBoard;
  }

  async delete(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Invalid ID');

    const result = await this.boardModel.findByIdAndDelete(id);

    return !!result;
  }
}
