import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      // Check if phoneNumber is valid
      const phoneNumberRegex = /^09\d{8}$/;
      if (!phoneNumberRegex.test(dto.phoneNumber)) {
        throw new BadRequestException('Invalid phone number format');
      }

      // Check if phoneNumber is already registered
      const existingUser = await this.prisma.user.findFirst({
        where: {
          phoneNumber: dto.phoneNumber,
        },
      });
      if (existingUser) {
        throw new ConflictException('Phone number already registered');
      }

      // Check if password is valid
      if (dto.password.length < 10 || dto.password.length > 30) {
        throw new BadRequestException(
          'Password must be between 10 and 30 characters',
        );
      }

      // Create new user
      const user = await this.prisma.user.create({
        data: {
          phoneNumber: dto.phoneNumber,
          hash,
        },
      });

      return this.signToken(user.id, user.phoneNumber);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return this.handlePrismaError(error);
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      // find the user by phoneNumber
      const user = await this.prisma.user.findUnique({
        where: {
          phoneNumber: dto.phoneNumber,
        },
      });
      // if user does noe exit throw exception
      if (!user)
        throw new ForbiddenException(
          'User does not exist or phone number is incorrect',
        );
      // compare password
      const pwMatches = await argon.verify(user.hash, dto.password);
      // if password incorrect throw exception
      if (!pwMatches) throw new ForbiddenException('Incorrect password');

      return this.signToken(user.id, user.phoneNumber);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return this.handlePrismaError(error);
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    phoneNumber: string,
  ): Promise<{ access_token: string }> {
    try {
      const payload = {
        sub: userId,
        phoneNumber,
      };
      const secret = this.config.get('JWT_SECRET');
      const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret,
      });

      return { access_token: token };
    } catch (error) {
      throw new ForbiddenException('Unable to sign token');
    }
  }

  private handlePrismaError(error: PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        throw new BadRequestException(
          'The provided value for the column is too long for the column’s type.',
        );
      case 'P2002':
        throw new ConflictException('Credentials taken');
      case 'P2025':
        throw new NotFoundException(
          'An operation failed because it depends on one or more records that were required but not found',
        );
      default:
        throw error;
    }
  }
}
