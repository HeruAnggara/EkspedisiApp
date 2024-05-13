import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class SupplierDto {
    @IsNotEmpty()
    @IsString()
    namaSupplier: string

    @IsString()
    keteranganBarang: string

    @IsNotEmpty()
    @IsNumber()
    harga: number

    @IsNotEmpty()
    @IsNumber()
    jumlahBarang: number

    @IsNotEmpty()
    @Matches(/^[0-9+]+$/)
    @MaxLength(13)
    nomorHp: string

}