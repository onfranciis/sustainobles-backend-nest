import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddDonationDto } from './dto/add-donation.dto';
import { DonationService } from './donation.service';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  create(@Body() AddDonationDto: AddDonationDto) {
    return this.donationService.create(AddDonationDto);
  }

  @Get()
  get() {
    return this.donationService.get();
  }
}
