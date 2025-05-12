import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../schema/admin.schema';
import { EmailParamGuard } from 'src/guard/mail.guard';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [AdminService, EmailParamGuard],
  exports: [AdminService],
})
export class AdminModule {}
