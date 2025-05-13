import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EmailParamGuard } from 'src/guard/mail.guard';
import { AdminService } from './admin.service';
import { AddAdminDto } from './dto/add-admin.dto';
import { GetAdminData } from 'src/decorator/get-admin-data.decorator';
import { Admin } from 'src/schema/admin.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() admin: AddAdminDto) {
    return this.adminService.addNewAdmin(admin);
  }

  @Get(':email')
  @UseGuards(EmailParamGuard)
  getAllAdmin(@GetAdminData() adminData: Admin) {
    return this.adminService.getAllAdmin(adminData);
  }

  @Delete(':email')
  @UseGuards(EmailParamGuard)
  deleteByEmail(@Param('email') email: string) {
    return this.adminService.deleteAdmin(email);
  }
}
