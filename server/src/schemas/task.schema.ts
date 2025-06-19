import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TaskPriority } from './enums';
import { timesTampOptions } from './schema.option';

@Schema()
export class Attachments {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  keyFromBucket: string;
}

@Schema(timesTampOptions)
export class Comments {
  @Prop({ required: true })
  text: string;
  @Prop({ type: Types.ObjectId, ref: 'Users', required: true })
  author: Types.ObjectId;
}

@Schema(timesTampOptions)
export class Tasks {
  @Prop({ required: true })
  title: string;
  @Prop({ type: Date })
  date_end: Date;
  @Prop({ type: String, enum: Object.values(TaskPriority) })
  priority: TaskPriority;
  @Prop({ type: Date })
  date_start: Date;
  @Prop({ type: [Attachments], default: [] })
  attachment: Attachments[];
  @Prop({ type: [Comments], default: [] })
  comments: Comments[];
  @Prop({ type: String })
  description: string;
  @Prop({ type: [Types.ObjectId], ref: 'Users', required: true })
  users: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'Board_Column', required: true })
  columnId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);
