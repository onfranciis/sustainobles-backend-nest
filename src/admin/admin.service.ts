import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/schema/admin.schema';
import { AddAdminDto } from './dto/add-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async addNewAdmin(admin: AddAdminDto): Promise<AdminDocument | null> {
    const result = await this.adminModel.findOne({ email: admin.email });

    if (result) {
      throw new ConflictException('An admin with this email already exists!');
    }

    return await new this.adminModel(admin).save();
  }

  async getAllAdmin(): Promise<AdminDocument[] | null> {
    return await this.adminModel.find();
  }

  async findByEmail(email: string): Promise<AdminDocument | null> {
    return await this.adminModel.findOne({ email });
  }

  async deleteAdmin(email: string): Promise<object> {
    const result = await this.adminModel.findOne({ email });

    if (!result) {
      throw new NotFoundException('No admin with this email was found!');
    }

    await this.adminModel.deleteOne({ email }).exec();

    return { message: `Deleted admin ${email}` };
  }
}
