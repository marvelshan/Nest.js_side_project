import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('appointments')
@ApiTags('Appointment')
@ApiBearerAuth()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Create Appointment',
    description:
      'Endpoint to create a new appointment for the authenticated user.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Appointment successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description:
      'User has already scheduled 5 appointments or patient has already scheduled 2 appointments for this date or Appointment already exists for this date and hour.',
  })
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
