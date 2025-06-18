import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IBoard } from 'src/board/interface/board.interface';

@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  title: string;
  @Prop({ type: Date, default: Date.now })
  created_at: Date;
  @Prop({ required: true })
  order: number;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Board_Column' }] })
  boardColumns: Types.ObjectId[];
}

export type BoardDocument = IBoard & Document;
export const BoardSchema = SchemaFactory.createForClass(Board);
