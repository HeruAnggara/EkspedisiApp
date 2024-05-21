import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LaporanService {
    constructor(private prisma: PrismaService) {}

    async labaRugi(start: string, end: string) {
        const startDate = start ? new Date(start) : new Date();
        const endDate = end ? new Date(end) : new Date();

        try {
            let pengiriman = await this.prisma.dataPengiriman.aggregate({
                _sum: {
                    ongkir: true,
                    komisi: true
                },
                where: {
                    tglTransaksi: {
                        gte: startDate,
                        lte: endDate
                    }
                }                
            })

            const totalPengiriman = Math.floor(pengiriman._sum.ongkir + pengiriman._sum.komisi)

            let pemasukkan = await this.prisma.pemasukkanLain.aggregate({
                _sum: {
                    harga: true,
                    komisi: true
                },
                where: {
                    tanggalTransaksi: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            const totalPemasukkan = Math.floor(pemasukkan._sum.harga + pemasukkan._sum.komisi)

            let pengeluaran = await this.prisma.daftarPengeluaran.aggregate({
                _sum: {
                    jumlahPembayaran: true,
                },
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            const totalPengeluaran = Math.floor(pengeluaran._sum.jumlahPembayaran)

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Laporan Laba Rugi',
                data: {
                    totalPengiriman,
                    totalPemasukkan,
                    totalPengeluaran
                }
            }
        } catch (error) {            
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async transaksiHarian(start: string, end: string) {
        const startDate = start ? new Date(start) : new Date();
        const endDate = end ? new Date(end) : new Date();

        try {
            const pengiriman = await this.prisma.dataPengiriman.findMany({
                where: {
                    tglTransaksi: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            const pemasukkan = await this.prisma.pemasukkanLain.findMany({
                where: {
                    tanggalTransaksi: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            const pengeluaran = await this.prisma.daftarPengeluaran.findMany({
                where: {
                    created_at: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            return {
                statusCode: HttpStatus.OK,
                message: 'Data Transaksi Harian',
                pengiriman,
                pemasukkan,
                pengeluaran
            }
        } catch (error) {
            console.log(error.message);
            
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
