import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DataPengirimanDto, UpdateDataPengirimanDto } from './dto/data-pengiriman.dto';

@Injectable()
export class DataPengirimanService {
    constructor(private prisma: PrismaService) {}

    private async findDataById(id: string) {
        const detail = await this.prisma.dataPengiriman.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Pengiriman Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: DataPengirimanDto) {        
            const jenisPengiriman = data.jenisPengiriman.toUpperCase();
            const jenis = await this.prisma.jenisPengiriman.findFirst({
                where: { jenisPengiriman: jenisPengiriman}
            })
            const status = await this.prisma.statusPengiriman.findFirst({
                where: { statusPengiriman: 'HND'}
            })
            const tanggalHariIni = new Date().getDate();
            const epochDate = Date.now();
            data.noResi = tanggalHariIni + 'LP' + epochDate;
            data.tglTransaksi = new Date();
            if (!jenis) {
                throw new HttpException('Jenis Pengiriman Yang Dimasukkan Tidak Sesuai', HttpStatus.BAD_REQUEST)
            }
            data.jenisPengiriman = jenis.id
            data.statusPengiriman = status.id;
            data.statusPembayaran = data.metodePembayaran == 'Tunai' ? 1 : 2;
            
        try {            
            await this.prisma.dataPengiriman.create({
                data: data
            })

            return {                
                statusCode: HttpStatus.CREATED,
                message: 'Data Data Pengiriman Berhasil Ditambahkan'
            }
        } catch (error) {    
            console.log(error.message);
                                
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }

    async read() {
        try {
            const data = await this.prisma.dataPengiriman.findMany()

            return {
                statusCode: HttpStatus.OK,
                message: "List Daftar Pengiriman",
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: UpdateDataPengirimanDto, id: string) {
        const detail = await this.findDataById(id);
        try {
            await this.prisma.dataPengiriman.update({
                where: { id: id },
                data: data
            })

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Daftar Pengiriman Berhasil Diperbarui'
            }
        } catch (error) {
            console.log(error.message);
            
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findDataById(id);
        try {
            await this.prisma.dataPengiriman.delete({
                where: { id: id }
            });

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Daftar Pengiriman Berhasil Dihapus'
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
            const data = await this.prisma.dataPengiriman.findFirst({
                where: { id: id}
            })

            return {
                 statusCode: HttpStatus.OK,
                 message: 'Detail Data Pengiriman',
                 data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async updateStatusPengiriman(status: string, id: string) {
        const detail = await this.findDataById(id);
        const statusPengiriman = await this.prisma.statusPengiriman.findFirst({
            where: { statusPengiriman: status}
        })
        try {
            await this.prisma.dataPengiriman.update({
                where: { id: id},
                data: {
                    statusPengiriman: statusPengiriman.id
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: `Status Pengiriman Dengan No Resi ${detail.noResi} Berhasil Diperbarui`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async updateStatusPembayaran(id: string) {
        const detail = await this.findDataById(id);

        if (detail.statusPembayaran == 1) {
            throw new HttpException('Status Pembayaran Sudah Lunas', HttpStatus.BAD_REQUEST)
        }
        try {
            await this.prisma.dataPengiriman.update({
                where: { id: id },
                data: {
                    statusPembayaran: 1
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: `Status Pembayaran Dengan No Resi ${detail.noResi} Berhasil Diperbarui`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            }
        }
    }
}
