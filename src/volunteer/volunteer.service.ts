import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddVolunteerDto } from './dto/add-volunteer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Volunteer, VolunteerDocument } from 'src/schema/volunteer.schema';
import { Model } from 'mongoose';
import { CSVParser } from 'src/util/csv.util';
import { SendMail } from 'src/util/mail.util';
import { Admin } from 'src/schema/admin.schema';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectModel(Volunteer.name) private volunteerModel: Model<Volunteer>,
  ) {}

  create(volunteer: AddVolunteerDto) {
    console.log('Volunteer received:', volunteer);
    const newVolunteer = new this.volunteerModel(volunteer);
    return newVolunteer.save();
  }

  get() {
    return this.volunteerModel.find();
  }

  async getAllVolunteer({
    email,
    name,
  }: Admin): Promise<VolunteerDocument[] | null | string> {
    console.log(email, name);
    const query = await this.volunteerModel.find().lean();
    const csv = await CSVParser(query, {
      _id: 'ID',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phoneNumber: 'Phone Number',
    });
    const res = await SendMail({
      subject: 'Volunteer CSV - From Sustainobles',
      text: `Hello ${name}, \nHere is your requested attatchment`,
      to: email,
      attachments: [
        {
          filename: `Volunteers - Sustainobles ${new Date().toLocaleTimeString()}.csv`,
          content: csv,
        },
      ],
    });

    if (res) {
      return `Volunteers have been sent to ${email}`;
    } else {
      throw new InternalServerErrorException(
        'Something went wrong while sending your mail!',
      );
    }
  }
}
