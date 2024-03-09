import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('mem')
  getMe(@Request() req) {
    return req.user;
  }
}
