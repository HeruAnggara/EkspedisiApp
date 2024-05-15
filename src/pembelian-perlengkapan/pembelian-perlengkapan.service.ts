import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PembelianPerlengkapanDto } from './dto/pembelian-perlengkapan.dto';

@Injectable()
export class PembelianPerlengkapanService {
    constructor(private prisma: PrismaService) {}

    private async findDataById(id: string) {
        const detail = await this.prisma.pembelianPerlengkapan.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Pembelian Perlengkapan Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: PembelianPerlengkapanDto) {
        try {
            await this.prisma.pembelianPerlengkapan.create({
                data: {
                    tanggalPembelian: new Date(),
                    idPerlengkapan: data.idPerlengkapan,
                    idSupplier: data.idSupplier,
                    harga: data.harga,
                    jumlah: data.jumlah,
                    keterangan: data.keterangan,
                    nota: data.nota
                }
            });

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Pembelian Perlengkapan Berhasil Ditambahkan'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.pembelianPerlengkapan.findMany();

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'List Data Pembelian Perlengkapan',
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: PembelianPerlengkapanDto, id: string) {
        const detail = await this.findDataById(id)

        try {
            await this.prisma.pembelianPerlengkapan.update({
                where: { id: id },
                data: {
                    idPerlengkapan: data.idPerlengkapan,
                    idSupplier: data.idSupplier,
                    harga: data.harga,
                    jumlah: data.jumlah,
                    keterangan: data.keterangan,
                    nota: data.nota
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: `Data Pembelian Perlengkapan Berhasil Diperbarui`
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
            await this.prisma.pembelianPerlengkapan.delete({
                where: { id: id }
            }) 

            return {
                statusCode: HttpStatus.OK,
                message: `Data Pembelian Perlengkapan Berhasil Dihapus`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findDataById(id)

        try {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Detail Data Pembelian Perlengkapan',
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
