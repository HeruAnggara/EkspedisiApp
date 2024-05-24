import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import PdfPrinter = require("pdfmake");
import { PrismaService } from 'src/prisma/prisma.service';
import { Alignment, TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class LaporanService {
    constructor(private prisma: PrismaService) {}

    private async getTotalPengiriman(startDate: Date, endDate: Date) {
        const pengiriman = await this.prisma.dataPengiriman.aggregate({
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
        });
    
        return Math.floor(pengiriman._sum.ongkir + pengiriman._sum.komisi);
    }

    private async getTotalPemasukkan(startDate: Date, endDate: Date) {
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
    
        return Math.floor(pemasukkan._sum.harga + pemasukkan._sum.komisi);
    }
    
    private async getTotalPengeluaran(startDate: Date, endDate: Date) {
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
    
        return Math.floor(pengeluaran._sum.jumlahPembayaran);
    }

    async labaRugi(start: Date, end: Date) {
        const startDate = start ? new Date(start) : new Date();
        const endDate = end ? new Date(end) : new Date();

        try {
            const totalPengiriman = await this.getTotalPengiriman(startDate, endDate);

            const totalPemasukkan = await this.getTotalPemasukkan(startDate, endDate);

            const totalPengeluaran = await this.getTotalPengeluaran(startDate, endDate);

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

    async transaksiHarian(start: Date, end: Date) {
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

    async exportLabaRugi(res: Response, start: Date, end: Date) {
        const startDate = start ? new Date(start) : new Date();
        const endDate = end ? new Date(end) : new Date();

        const title = 'Laporan Laba Rugi'
        const waktuCetak = new Date().toLocaleString();
        const jumlahPengiriman = 'Jumlah Pengiriman: ' + await this.getTotalPengiriman(startDate, endDate);
        const jumlahPemasukkan = 'Jumlah Pemasukkan: ' + await this.getTotalPemasukkan(startDate, endDate);
        const jumlahPengeluaran = 'Jumlah Pengeluaran: ' + await this.getTotalPengeluaran(startDate, endDate);

        try {
            const dd: TDocumentDefinitions = {
                content: [
                    {
                        text: title,
                        style: 'header',
                        alignment: 'center' as Alignment,
                    },
                    {
                        text: `Dicetak Pada: ${waktuCetak}`,
                        style: 'subheader',
                        marginTop: 10,
                        marginBottom: 20,
                        bold: false
                    },
                    {
                        ul: [
                            {
                                text: jumlahPengiriman,
                                style: 'subheader',
                                marginBottom: 5
                            },
                            {
                                text: jumlahPemasukkan,
                                style: 'subheader',
                                marginBottom: 5
                            },
                            {
                                text: jumlahPengeluaran,
                                style: 'subheader',
                                marginBottom: 5
                            }
                        ]
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 20, 10]
                    },
                    subheader: {
                        fontSize: 15,
                        bold: true,
                        margin: [20, 0, 20, 0]
                    },
                }
            };
          
            const fonts = {
                Roboto: {
                  normal: 'fonts/Roboto-Regular.ttf',
                  bold: 'fonts/Roboto-Medium.ttf',
                  italics: 'fonts/Roboto-Italic.ttf',
                  bolditalics: 'fonts/Roboto-MediumItalic.ttf',
                }
              };
          
            const printer = new PdfPrinter(fonts);
            const pdfDoc = printer.createPdfKitDocument(dd);
            res.setHeader('Content-Type', 'application/pdf');
            pdfDoc.pipe(res);
            pdfDoc.end();
        } catch (error) {
            console.log(error.message);
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            };
        } 
    }
}
