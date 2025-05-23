import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VolunteerDocument = HydratedDocument<Volunteer>;

@Schema()
export class Volunteer {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const VolunteerSchema = SchemaFactory.createForClass(Volunteer);
