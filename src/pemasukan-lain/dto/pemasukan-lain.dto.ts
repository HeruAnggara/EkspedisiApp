import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PemasukanLainDto {
    @IsNotEmpty()
    @IsString()
    kategori: string

    @IsNotEmpty()
    @IsString()
    namaCustomer: string

    @IsNotEmpty()
    @IsNumber()
    harga: number

    @IsNotEmpty()
    @IsNumber()
    komisi: number

}