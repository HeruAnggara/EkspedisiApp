import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';

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

  async testingMail(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    try {
      await this.mail.sendMail({
        to: "john@gmail.com",
        subject: `Testing Email Success`,
        template: 'testing',
        context: {
          name: "John"
        },
        attachments: [
          {
            filename: file.originalname,
            path: file.path,
          },
        ],
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Email sent successfully',
      };
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
}
