import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";

export class UpdateDto {
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9+]+$/)
  no_wa: string

  @IsNotEmpty()
  @IsString()
  alamat

  @IsNotEmpty()
  levelId: number
  
}