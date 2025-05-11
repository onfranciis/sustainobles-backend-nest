import { Injectable } from '@nestjs/common';
import { AddVolunteerDto } from './dto/add-volunteer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Volunteer } from 'src/schema/volunteer.schema';
import { Model } from 'mongoose';

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
}
