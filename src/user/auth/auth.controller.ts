import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from 'src/dtos/authdto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
   async signup(@Body() data: signupDto) {
    const user= await this.authService.signupService(data)
    console.log(user)
  }
}
