import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from 'src/schema/admin.schema';

export const GetAdminData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req: { admin: Admin } = ctx.switchToHttp().getRequest();
    return req.admin;
  },
);
