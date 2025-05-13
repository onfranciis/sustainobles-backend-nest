import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddDonationDto } from './dto/add-donation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Donation, DonationDocument } from 'src/schema/donation.schema';
import { Model } from 'mongoose';
import { Admin } from 'src/schema/admin.schema';
import { CSVParser } from 'src/util/csv.util';
import { SendMail } from 'src/util/mail.util';

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

  async getAllDonation({
    email,
    name,
  }: Admin): Promise<DonationDocument[] | null | string> {
    console.log(email, name);
    const query = await this.donationModel.find().lean();
    const csv = await CSVParser(query, {
      _id: 'ID',
      name: 'Name',
      phoneNumber: 'Phone Number',
      description: 'Description',
    });
    const res = await SendMail({
      subject: 'Donation CSV - From Sustainobles',
      text: `Hello ${name}, \nHere is your requested attatchment`,
      to: email,
      attachments: [
        {
          filename: `Donations - Sustainobles ${new Date().toLocaleTimeString()}.csv`,
          content: csv,
        },
      ],
    });

    if (res) {
      return `Donations have been sent to ${email}`;
    } else {
      throw new InternalServerErrorException(
        'Something went wrong while sending your mail!',
      );
    }
  }
}
