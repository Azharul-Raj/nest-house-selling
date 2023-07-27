import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { generateKeyDto, signinDto, signupDto } from 'src/dtos/authdto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //singUp controller
  @Post('/signup')
   async signup(@Body() data: signupDto) {
    const user= await this.authService.signupService(data)
    console.log(user)
  }
  //signIn controller
  @Post('/signin')
  async signin(@Body() data:signinDto){
    return await this.authService.signInService(data)
  }
  //get user
  @Get('/user/:id')
  async getUser(@Param('id') id:string){
    return await this.authService.getUserService(id)
  }
  //generate a product key
  @Post('/key')
  async generateProductKey(@Body() {email,role}:generateKeyDto){
    return await this.authService.generateProductKeyService(email,role)
  }
}
