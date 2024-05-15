import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PemasukanLainDto } from './dto/pemasukan-lain.dto';

@Injectable()
export class PemasukanLainService {
    constructor(private prisma: PrismaService) {}

    private async findDataById(id: string) {
        const detail = await this.prisma.pemasukkanLain.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Pemasukkan Lain Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: PemasukanLainDto) {
        try {
            await this.prisma.pemasukkanLain.create({
                data: {
                    kategori: data.kategori,
                    namaCustomer: data.namaCustomer,
                    tanggalTransaksi: new Date(),
                    harga: data.harga,
                    komisi: data.komisi
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
            const data = await this.prisma.pemasukkanLain.findMany()

            return {
                statusCode: HttpStatus.OK,
                message: "List Data Pemasukkan Lainnya",
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: PemasukanLainDto, id: string) {
        const detail = await this.findDataById(id);

        try {
            await this.prisma.pemasukkanLain.update({
                where: { id: id },
                data: {
                    kategori: data.kategori,
                    namaCustomer: data.namaCustomer,
                    harga: data.harga,
                    komisi: data.komisi
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Pemasukkan Lainnya Berhasil Diperbarui'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findDataById(id);

        try {
            await this.prisma.pemasukkanLain.delete({
                where: { id: id }
            });

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Pemasukkan Lainnya Berhasil Dihapus'
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
        const detail = await this.findDataById(id);

        try {
            const data = await this.prisma.pemasukkanLain.findFirst({
                where: { id: id}
            })

            return {
                 statusCode: HttpStatus.OK,
                 message: 'Detail Data Pemasukkan Lainnya',
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
