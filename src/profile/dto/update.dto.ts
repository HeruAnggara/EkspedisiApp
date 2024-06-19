import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

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
  alamat: string

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
  password: string;

  oldPassword: string;

  @IsNotEmpty()
  levelId: number
  
}