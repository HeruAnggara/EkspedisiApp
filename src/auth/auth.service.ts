import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {compare} from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService ,private usersService: UsersService, private jwtService: JwtService) {}
  
    async validateUser(data: LoginDto): Promise<any> {
      const user = await this.prisma.user.findFirst({
          where: {
              email: data.email,
          },
      });
      if (user && user.password === data.password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(data: LoginDto) {
      const user = await this.prisma.user.findFirst({
          where: {
              email: data.email,
          },
      });
      if (!user) {
          throw new HttpException('Pengguna tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      const payload = { email: user.email, sub: user.id, levelId: user.levelId };

      const checkPassword = await compare(
          data.password,
          user.password,
      );
      if (!checkPassword) {
        throw new HttpException(
          'Email atau password tidak cocok',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        statusCode: 200,
        message: 'Login berhasil',
        access_token: this.jwtService.sign(payload),
      };
    }
  }
