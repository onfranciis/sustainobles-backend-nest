import { Admin } from 'src/schema/admin.schema';

declare namespace Express {
  export interface Request {
    admin?: Admin;
  }
}
