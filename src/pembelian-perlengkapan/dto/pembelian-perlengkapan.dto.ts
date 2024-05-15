import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PembelianPerlengkapanDto {    
    @IsNotEmpty()
    @IsString()
    idPerlengkapan: string

    @IsNotEmpty()
    @IsString()
    idSupplier: string

    @IsNotEmpty()
    @IsNumber()
    harga: number

    @IsNotEmpty()
    @IsNumber()
    jumlah: number

    @IsString()
    keterangan: string

    @IsString()
    nota: string
}