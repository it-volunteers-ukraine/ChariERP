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
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId;
}

@Schema(timesTampOptions)
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop({ type: Date })
  endDate: Date;
  @Prop({ type: String, enum: Object.values(TaskPriority) })
  priority: TaskPriority;
  @Prop({ type: Date })
  startDate: Date;
  @Prop({ type: [Attachments], default: [] })
  attachments: Attachments[];
  @Prop({ type: [Comments], default: [] })
  comments: Comments[];
  @Prop({ type: String })
  description: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  assignees: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'Column' })
  activeColumn: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
