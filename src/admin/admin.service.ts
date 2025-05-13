import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/schema/admin.schema';
import { AddAdminDto } from './dto/add-admin.dto';
import { SendMail } from 'src/util/mail.util';
import { CSVParser } from 'src/util/csv.util';

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

  async getAllAdmin({
    email,
    name,
  }: Admin): Promise<AdminDocument[] | null | string> {
    const query = await this.adminModel.find().lean();
    const csv = await CSVParser(query, {
      _id: 'ID',
      name: 'Name',
      email: 'Email',
    });
    const res = await SendMail({
      subject: 'Admin CSV - From Sustainobles',
      text: `Hello ${name}, \nHere is your requested attatchment`,
      to: email,
      attachments: [
        {
          filename: `Admins - Sustainobles ${new Date().toLocaleTimeString()}.csv`,
          content: csv,
        },
      ],
    });

    if (res) {
      return `Admins have been sent to ${email}`;
    } else {
      throw new InternalServerErrorException(
        'Something went wrong while sending your mail!',
      );
    }
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
