import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  LoginGuard,
} from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth') 
export class AuthController {
  constructor(private authService: AuthService) {} 

  @Post('register') 
  
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto); 
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
        // maxAge: 10000,
      });
    }
    return res.send({ message: 'login success' });
  }

  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
     
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1day
      });
    }
    return res.send({ message: 'login2 success' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인을 한 경우 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  login3(@Request() req) {
    console.log('login3');
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuardWithSession(@Request() req) {
    return req.user;
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
