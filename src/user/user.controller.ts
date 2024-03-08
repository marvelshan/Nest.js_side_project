import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    console.log(req.body);
    return 'user info';
  }
}
