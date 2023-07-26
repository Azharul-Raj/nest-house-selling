import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signinDto, signupDto } from 'src/dtos/authdto';

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
    console.log(data)
    return await this.authService.signInService(data)
  }
  //get user
  @Get('/user/:id')
  async getUser(@Param('id') id:string){
    return await this.authService.getUserService(id)
  }
}
