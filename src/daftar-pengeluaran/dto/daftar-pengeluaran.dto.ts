import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DaftarPengeluaranDto {
    @IsString()
    keterangan: string

    @IsNotEmpty()
    @IsNumber()
    jumlahPembayaran: number

    @IsNotEmpty()
    @IsString()
    yangMenerima: string

    @IsNotEmpty()
    @IsString()
    metodePembayaran: string

    @IsString()
    buktiPembayaran: string

    @IsNumber()
    statusPengeluaran: number

    @IsNotEmpty()
    @IsString()
    jenisPengeluaran: string
}