import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Board, BoardSchema } from 'src/schemas/board.schemas';

import { BoardService } from './board.service';
import { BoardController } from './board.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }])],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [],
})
export class BoardModule {}
