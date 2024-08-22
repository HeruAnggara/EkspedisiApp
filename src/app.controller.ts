import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginDto } from './auth/dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
}

  @UseGuards(JwtAuthGuard)
  @Get('get/profile')
  getProfile(@Req() req) {
    const user = req.user
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('jenis-pengiriman')
  async getJenisPengiriman() {
    return await this.appService.getJenisPengiriman();
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('status-pengiriman')
  async getStatusPengiriman() {
    return await this.appService.getStatusPengiriman();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('send-email')
  @UseInterceptors(FileInterceptor('file'))
  async sendMail(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.testingMail(file);
  }
}
