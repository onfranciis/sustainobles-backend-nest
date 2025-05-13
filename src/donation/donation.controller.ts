import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AddDonationDto } from './dto/add-donation.dto';
import { DonationService } from './donation.service';
import { EmailParamGuard } from 'src/guard/mail.guard';
import { GetAdminData } from 'src/decorator/get-admin-data.decorator';
import { Admin } from 'src/schema/admin.schema';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  create(@Body() AddDonationDto: AddDonationDto) {
    return this.donationService.create(AddDonationDto);
  }

  @Get(':email')
  @UseGuards(EmailParamGuard)
  getAllAdmin(@GetAdminData() adminData: Admin) {
    return this.donationService.getAllDonation(adminData);
  }
}
