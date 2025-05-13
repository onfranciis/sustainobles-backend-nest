import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { EMAIL_REGEX } from 'src/util/const.util';

export class AddVolunteerDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim())
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim())
  lastName: string;

  @Transform(({ value }: { value: string }) => value.replace(/[\s-]/g, ''))
  @Matches(/^(\+?\d{1,3})?0?\d{10}$/, {
    message: 'Phone number must be valid (e.g., 08012345678 or +2348012345678)',
  })
  phoneNumber: number;

  @Transform(({ value }: { value: string }) => value.replace(/[\s-]/g, ''))
  @Matches(EMAIL_REGEX, {
    message: 'Email must be a valid address',
  })
  email: string;
}
