import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Express } from 'express';
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

    async importExcel(file: Express.Multer.File) {
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // await this.validateImportedData(data);
    
        const results = [];
    
        for (const item of data as any[]) {
            // const dataPengiriman = new DataPengirimanDto();
            const jenis = await this.prisma.jenisPengiriman.findFirst({
                where: { jenisPengiriman: item.jenisPengiriman }
            });
            const status = await this.prisma.statusPengiriman.findFirst({
                where: { statusPengiriman: item.statusPengiriman }
            });
            if (!jenis || !status) {
                throw new HttpException('Jenis atau Status Pengiriman Tidak Ditemukan', HttpStatus.NOT_FOUND);
            }
    
            item.jenisPengiriman = jenis.id;
            item.statusPengiriman = status.id;
            item.noWaPengirim = `0${item.no_hp_pengirim}`;
            item.noWaPenerima = `0${item.no_hp_penerima}`;
            item.tglTransaksi = new Date((item.tgl_transaksi + 1) * 24 * 60 * 60 * 1000 + new Date('1899-12-30').getTime());
            item.bawaSendiri = item.bawaSendiri == 'ya';
            item.statusPembayaran = item.metodePembayaran === 'Tunai' ? 1 : 2;
    
            const newData = {
                ...item
            };
    
            try {
            
                const createdData = await this.prisma.dataPengiriman.create({
                    data: newData
                });
                results.push(newData);
            } catch (error) {
                console.log(error.message);

                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Data Pengiriman Berhasil Diimpor',
        };
    }

    async validateImportedData(data: any[]) {
        // Validasi Data Kosong
        if (data.length === 0) {
            throw new HttpException('Data Kosong', HttpStatus.BAD_REQUEST);
        }
    
        // Validasi Duplikasi Data
        const uniqueIds = new Set();
        for (const item of data) {
            if (uniqueIds.has(item.id)) {
                throw new HttpException('Duplikasi Data', HttpStatus.BAD_REQUEST);
            }
            uniqueIds.add(item.id);
        }
    
        // Validasi Kolom Metode Pembayaran
        for (const item of data) {
            if (item.metodePembayaran !== 'Tunai' && item.metodePembayaran !== 'Transfer') {
                throw new HttpException('Kolom Metode Pembayaran Harus Tunai / Transfer', HttpStatus.BAD_REQUEST);
            }
    
            // Validasi Kolom Bank
            if (item.metodePembayaran === 'Transfer' && !item.bank) {
                throw new HttpException('Kolom Bank Wajib Diisi Jika Metode Pembayaran = Transfer', HttpStatus.BAD_REQUEST);
            }
    
            // Validasi Kolom Bukti Pembayaran
            if (item.metodePembayaran === 'Transfer' && !item.buktiPembayaran) {
                throw new HttpException('Kolom Bukti Pembayaran Wajib Diisi Jika Metode Pembayaran = Transfer', HttpStatus.BAD_REQUEST);
            }
    
            if (item.metodePembayaran === 'Tunai' && item.bank) {
                throw new HttpException('Kolom Bank Wajib Kosong Jika Metode Pembayaran = Tunai', HttpStatus.BAD_REQUEST);
            }
    
            if (item.metodePembayaran === 'Tunai' && item.buktiPembayaran) {
                throw new HttpException('Kolom Bukti Pembayaran Wajib Kosong Jika Metode Pembayaran = Tunai', HttpStatus.BAD_REQUEST);
            }
        }
    }
}
