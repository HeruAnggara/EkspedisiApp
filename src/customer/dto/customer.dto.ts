import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator"

export class CustomerDto {
    @IsNotEmpty()
    @IsString()
    nama: string

    @IsNotEmpty()
    @Matches(/^[0-9+]+$/)
    @MaxLength(15)
    noWa: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    alamat: string

    @IsString()
    username: string
}