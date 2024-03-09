import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe', type: String })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '12345687f1', type: String })
  identity: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '1970-01-01T00:00:00.000Z', type: String })
  birthday: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123 Main Street', type: String })
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
