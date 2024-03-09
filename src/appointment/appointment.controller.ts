import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createAppointment(
    @Body() createAppointmentDto: AppointmentDto,
    @Request() req,
  ) {
    try {
      const userId = req.user.id;
      const appointmentWithUserIdDto = { ...createAppointmentDto, userId };
      return await this.appointmentService.createAppointment(
        appointmentWithUserIdDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
