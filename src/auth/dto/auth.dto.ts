import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '0912345678' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '*************' })
  password: string;
}
