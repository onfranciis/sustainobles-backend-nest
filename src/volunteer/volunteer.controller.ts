import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddVolunteerDto } from './dto/add-volunteer.dto';
import { VolunteerService } from './volunteer.service';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  create(@Body() AddVolunteerDto: AddVolunteerDto) {
    return this.volunteerService.create(AddVolunteerDto);
  }

  @Get()
  get() {
    return this.volunteerService.get();
  }
}
