import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback> & {
  createdAt: Date;
};

@Schema({ versionKey: false, timestamps: true })
export class Feedback {
  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, maxlength: 400 })
  message: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
