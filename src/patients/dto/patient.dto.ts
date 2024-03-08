import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class PatientDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  identity: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  address: string;
}
