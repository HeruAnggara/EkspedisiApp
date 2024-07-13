import { IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator"

export class BankDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(15)
    namaBank: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    cabang: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    noRekening: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    namaPemilik: string
}