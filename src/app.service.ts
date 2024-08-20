import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor (private prisma: PrismaService, private mail: MailerService) {}

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

  async testingMail() {
    this.mail.sendMail({
        to: "john@gmail.com",
        subject: `Testing Email Success`,
        template: 'testing',
        context: {
         name: "John"
        },
    });

    return  'Success';
  }
}
