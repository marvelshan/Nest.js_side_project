import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class AppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsString()
  @IsNotEmpty()
  consultationContent: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  hour: number;
}
