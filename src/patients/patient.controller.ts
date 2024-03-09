import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Patient')
@ApiBearerAuth()
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Create Patient',
    description: 'Endpoint to create a new patient',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Patient succefully created',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Patient with this identity already exists',
  })
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
  @UseGuards(JwtGuard)
  @ApiOperation({
    summary: 'Get Patients',
    description: 'Endpoint to get all patients',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Patient information',
  })
  async getPatients(@Request() req) {
    try {
      const userId = req.user.id;
      return await this.patientService.getPatients(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
