import { ForbiddenException, Injectable } from '@nestjs/common';
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
      const user = await this.prisma.user.create({
        data: {
          phoneNumber: dto.phoneNumber,
          hash,
        },
      });
      return this.signToken(user.id, user.phoneNumber);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // 'Unique constraint failed on the {constraint}'
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
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
      console.log(`auth service signin error is ${error}`);
    }
  }

  async signToken(
    userId: number,
    phoneNumber: string,
  ): Promise<{ access_token: string }> {
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
  }
}
