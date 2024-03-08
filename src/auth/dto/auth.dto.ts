import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
