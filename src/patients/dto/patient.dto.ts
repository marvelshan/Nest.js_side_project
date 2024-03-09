import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class PatientDto {
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

export class PatientWithUserIdDto {
  @IsString()
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
