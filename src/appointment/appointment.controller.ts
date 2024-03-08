import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly jwtValidator: Jwt,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async createAppointment(@Body() createAppointmentDto: AppointmentDto) {
    try {
      return await this.appointmentService.createAppointment(
        createAppointmentDto,
      );
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
