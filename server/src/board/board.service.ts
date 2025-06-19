import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateBoardDto } from './dto/board-create.request';
import { Board, BoardDocument } from 'src/schemas/board.schemas';
import { CreateBoard } from './types';

@Injectable()
export class BoardService {
  constructor(@InjectModel(Board.name) private boardModel: Model<BoardDocument>) {}

  async create({ title, organizationId }: CreateBoard): Promise<BoardDocument> {
    const boards = await this.boardModel.find({ organizationId }).select('_id').lean().exec();

    if (boards.length >= 5) {
      throw new NotFoundException('Maximum number of boards (5) reached for this organization');
    }

    const existingBoard = await this.boardModel
      .findOne({
        _id: { $in: boards.map((b) => b._id) },
        title: title,
      })
      .lean()
      .exec();

    if (existingBoard) {
      throw new NotFoundException('Board with this title already exists');
    }

    const newBoard = await this.boardModel.create({
      title,
      order: 0,
      organizationId,
      boardColumns: [],
    });
    return newBoard;
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
