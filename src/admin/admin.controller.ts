import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // create(@Body() admin: AddAdminDto) {
  //   return this.adminService.addNewAdmin(admin);
  // }

  // @Get(':email')
  // @UseGuards(EmailParamGuard)
  // getAllAdmin(@GetAdminData() adminData: Admin) {
  //   return this.adminService.getAllAdmin(adminData);
  // }

  // @Delete(':email')
  // @UseGuards(EmailParamGuard)
  // deleteByEmail(@Param('email') email: string) {
  //   return this.adminService.deleteAdmin(email);
  // }
}
