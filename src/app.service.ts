import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor (private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getJenisPengiriman() {
    try {
        const data = await this.prisma.jenisPengiriman.findMany();

        return {
            statusCode: HttpStatus.OK,
            message: 'List Data Jenis Pengiriman',
            data: data
        }
    } catch (error) {
        return{
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message
        }
    }
  }
  
  async getStatusPengiriman() {
    try {
        const data = await this.prisma.statusPengiriman.findMany();

        return {
            statusCode: HttpStatus.OK,
            message: 'List Data Status Pengiriman',
            data: data
        }
    } catch (error) {
        return{
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message
        }
    }
  }
}
