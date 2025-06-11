import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IBoard } from 'src/board/interface/board.interface';

@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  title: string;
}

export type BoardDocument = IBoard & Document;
export const BoardSchema = SchemaFactory.createForClass(Board);
