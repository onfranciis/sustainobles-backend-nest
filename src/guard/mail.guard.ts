import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/schema/admin.schema';
import { EMAIL_REGEX } from 'src/util/const.util';

@Injectable()
export class EmailParamGuard implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const email = request.params.email;

    if (!email || !EMAIL_REGEX.test(email)) {
      throw new BadRequestException('Invalid email in URL parameter');
    }

    const admin = await this.adminService.findByEmail(email);
    (request as unknown as { admin: Admin | null }).admin = admin;

    if (!admin) {
      throw new BadRequestException('Who are you?');
    }

    return true;
  }
}
