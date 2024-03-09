import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';

export class AppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: '1', type: Number })
  patientId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Sick', type: String })
  consultationContent: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2023-03-11T00:17:00.000Z', type: Date })
  date: Date;

  @IsNotEmpty()
  @ApiProperty({ example: '13:00', type: String })
  hour: string;
}

export class AppointmentWithUserIdDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  consultationContent: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  hour: string;
}
