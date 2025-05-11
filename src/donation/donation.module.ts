import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from 'src/schema/donation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
  controllers: [DonationController],
  providers: [DonationService],
})
export class DonationModule {}
