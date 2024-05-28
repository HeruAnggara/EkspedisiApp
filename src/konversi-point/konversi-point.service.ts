import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KonversiPointService {
    constructor(private prisma: PrismaService) {}
    async index() {
        try {
            const data = await this.prisma.konversiPoint.findFirst({
                orderBy: {
                    id: 'asc'
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Konversi Point',
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }

    async update(nominal: number, id: string) {
        try {
            await this.prisma.konversiPoint.update({
                where: { id: id },
                data: {
                    nominal: nominal
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Konversi Point Berhasil Diperbarui'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
