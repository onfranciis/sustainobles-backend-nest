import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DonationModule } from './donation/donation.module';
import { VolunteerModule } from './volunteer/volunteer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),
    AdminModule,
    DonationModule,
    VolunteerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
