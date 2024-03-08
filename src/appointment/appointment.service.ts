import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentDto } from './dto';
import { UnprocessableEntityException } from '@nestjs/common';

export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(appointmentDto: AppointmentDto) {
    const { patientId, consultationContent, date, hour } = appointmentDto;

    // Check if appointment already exits
    const existingAppointment = await this.prisma.appointment.findFirst({
      where: { patientId, date, hour },
    });
    if (existingAppointment) {
      throw new UnprocessableEntityException(
        'Appointment already exists for this date and hour',
      );
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        patientId,
        consultationContent,
        date,
        hour,
      },
    });

    return appointment;
  }
}
