import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddVolunteerDto } from './dto/add-volunteer.dto';
import { VolunteerService } from './volunteer.service';
import { EmailParamGuard } from 'src/guard/mail.guard';
import { GetAdminData } from 'src/decorator/get-admin-data.decorator';
import { Admin } from 'src/schema/admin.schema';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  create(@Body() AddVolunteerDto: AddVolunteerDto) {
    return this.volunteerService.create(AddVolunteerDto);
  }

  @Get(':email')
  @UseGuards(EmailParamGuard)
  getAllAdmin(@GetAdminData() adminData: Admin) {
    return this.volunteerService.getAllVolunteer(adminData);
  }
}
