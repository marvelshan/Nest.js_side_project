import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async createPatient(@Body() createPatientDto: PatientDto) {
    try {
      return await this.patientService.createPatient(createPatientDto);
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
