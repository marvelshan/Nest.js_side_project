import { PrismaService } from 'src/prisma/prisma.service';
import { AppointmentWithUserIdDto } from './dto';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(appointmentWithUserIdDto: AppointmentWithUserIdDto) {
    const { userId, patientId, consultationContent, date, hour } =
      appointmentWithUserIdDto;

    // Validate hour format
    const hourRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // HH:mm format
    if (!hourRegex.test(hour)) {
      throw new UnprocessableEntityException(
        'Invalid hour format. Please use HH:mm format (00:00 - 23:59)',
      );
    }

    // Check if user has already scheduled 5 appointments or if patient has already scheduled 2 appointments for this date
    const existingAppointments = await this.prisma.appointment.findMany({
      where: {
        OR: [
          { userId, date: { equals: date } },
          { patientId, date: { equals: date } },
        ],
      },
    });

    const userAppointmentsCount = existingAppointments.filter(
      (appointment) => appointment.userId === userId,
    ).length;
    const patientAppointmentsCount = existingAppointments.filter(
      (appointment) => appointment.patientId === patientId,
    ).length;

    if (userAppointmentsCount >= 5) {
      throw new UnprocessableEntityException(
        'User has already scheduled 5 appointments',
      );
    }

    if (patientAppointmentsCount >= 2) {
      throw new UnprocessableEntityException(
        'Patient has already scheduled 2 appointments for this date',
      );
    }

    // Check if appointment already exists
    const existingAppointment = existingAppointments.find(
      (appointment) => appointment.hour === hour,
    );
    if (existingAppointment) {
      throw new UnprocessableEntityException(
        'Appointment already exists for this date and hour',
      );
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        userId,
        patientId,
        consultationContent,
        date,
        hour,
      },
    });

    return appointment;
  }
}
