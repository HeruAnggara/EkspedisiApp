import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class JenisPengeluaranDto {
  
  @IsNotEmpty()
  @IsString()
  jenisPengeluaran: string;

  @IsString()
  keterangan: string;
}