import { Controller, Post, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Post('protected')
  protectedRoute() {
    return "Faqat adminlar uchun";
  }
}
