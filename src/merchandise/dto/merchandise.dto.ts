import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MerchandiseDto {
    @IsNotEmpty()
    @IsString()
    nama: string

    @IsNotEmpty()
    @IsNumber()
    nilai: number

    // @IsNotEmpty()
    // @IsString()
    gambar: string
}