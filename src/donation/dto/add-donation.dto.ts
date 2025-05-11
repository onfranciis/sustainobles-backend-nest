import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AddDonationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.trim())
  name: string;

  @Transform(({ value }: { value: string }) => value.replace(/[\s-]/g, ''))
  @Matches(/^(\+?\d{1,3})?0?\d{10}$/, {
    message: 'Phone number must be valid (e.g., 08012345678 or +2348012345678)',
  })
  phoneNumber: number;

  @IsString()
  @IsNotEmpty()
  description: boolean;
}
