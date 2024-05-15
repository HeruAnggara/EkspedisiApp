import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DaftarPengeluaranDto } from './dto/daftar-pengeluaran.dto';
import { MetodePembayaran } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class DaftarPengeluaranService {
    constructor(private prisma: PrismaService) {}

    async create(data: DaftarPengeluaranDto, userId: string) {
        const user = await this.prisma.user.findFirst({
            where: { id: userId }
        })
        try {
            await this.prisma.daftarPengeluaran.create({
                data: {
                    tglPengeluaran: new Date(),
                    keterangan: data.keterangan,
                    jumlahPembayaran: data.jumlahPembayaran,
                    yangMembayar: user.name,
                    yangMenerima: data.yangMenerima,
                    metodePembayaran: MetodePembayaran[data.metodePembayaran as keyof typeof MetodePembayaran],
                    buktiPembayaran: data.buktiPembayaran,
                    statusPengeluaran: data.statusPengeluaran,
                    jenisPengeluaran: data.jenisPengeluaran
                }
            })

            return {                
                statusCode: HttpStatus.CREATED,
                message: 'Data Daftar Pengeluaran Berhasil Ditambahkan'
            }
        } catch (error) {            
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        try {
            const data = await this.prisma.daftarPengeluaran.findMany()

            return {
                statusCode: HttpStatus.OK,
                message: "List Daftar Pengeluaran",
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: DaftarPengeluaranDto, id: string) {
        try {
            await this.prisma.daftarPengeluaran.update({
                where: { id: id },
                data: {
                    keterangan: data.keterangan,
                    jumlahPembayaran: data.jumlahPembayaran,
                    yangMenerima: data.yangMenerima,
                    metodePembayaran: MetodePembayaran[data.metodePembayaran as keyof typeof MetodePembayaran],
                    buktiPembayaran: data.buktiPembayaran,
                    statusPengeluaran: data.statusPengeluaran,
                    jenisPengeluaran: data.jenisPengeluaran
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Daftar Pengeluaran Berhasil Diperbarui'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        try {
            await this.prisma.daftarPengeluaran.delete({
                where: { id: id }
            });

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Daftar Pengeluaran Berhasil Dihapus'
            }
        } catch (error) {
            console.log(error.message);

            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        try {
            const data = await this.prisma.daftarPengeluaran.findFirst({
                where: { id: id}
            })

            return {
                 statusCode: HttpStatus.OK,
                 message: 'Detail Data Daftar Pengeluaran',
                 data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
