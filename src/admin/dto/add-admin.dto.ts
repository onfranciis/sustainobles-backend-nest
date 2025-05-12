import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { EMAIL_REGEX } from 'src/util/const.util';

export class AddAdminDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim())
  name: string;

  @Transform(({ value }: { value: string }) => value.replace(/[\s-]/g, ''))
  @Matches(EMAIL_REGEX, {
    message: 'Email must be a valid address',
  })
  email: string;
}
