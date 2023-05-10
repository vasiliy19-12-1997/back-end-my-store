import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /*Login getNewToken */
  @HttpCode(200)
  @Post('register')
  async register() {
    return this.authService.register();
  }
}
