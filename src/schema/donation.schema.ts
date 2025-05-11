import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DonationDocument = HydratedDocument<Donation>;

@Schema()
export class Donation {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  description: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
