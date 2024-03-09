import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createPatient(@Body() createPatientDto: PatientDto, @Request() req) {
    try {
      const userId = req.user.id;
      const patientWithUserIdDto = { ...createPatientDto, userId };

      return await this.patientService.createPatient(patientWithUserIdDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getPatients() {
    try {
      return await this.patientService.getPatients();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
