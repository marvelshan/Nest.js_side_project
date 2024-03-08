import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
