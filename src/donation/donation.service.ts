import { Injectable } from '@nestjs/common';
import { AddDonationDto } from './dto/add-donation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donation } from 'src/schema/donation.schema';
import { Model } from 'mongoose';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<Donation>,
  ) {}

  create(donation: AddDonationDto) {
    console.log('Donation received:', donation);
    const newDonation = new this.donationModel(donation);
    return newDonation.save();
  }

  get() {
    return this.donationModel.find();
  }
}
