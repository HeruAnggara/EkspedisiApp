import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class PerlengkapanDto {
  
  @IsNotEmpty()
  @IsString()
  namaPerlengkapan: string;

  @IsString()
  keterangan: string;
}