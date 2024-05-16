import { MetodePembayaran } from "@prisma/client";
import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class DataPengirimanDto {
  noResi: string;

  tglTransaksi: Date;

  @IsNotEmpty()
  @IsString()
  namaPengirim: string;

  @IsNotEmpty()
  @Matches(/^[0-9+]+$/)
  @MaxLength(15)
  noWaPengirim: string;

  @IsNotEmpty()
  @IsString()
  namaPenerima: string;

  @IsNotEmpty()
  @Matches(/^[0-9+]+$/)
  @MaxLength(15)
  noWaPenerima: string;

  @IsNotEmpty()
  @IsString()
  kota_tujuan: string;

  @IsNotEmpty()
  @IsDecimal()
  beratBarang: number;

  @IsNotEmpty()
  @IsNumber()
  ongkir: number;

  @IsNotEmpty()
  @IsNumber()
  komisi: number;

  statusPembayaran: number;

  @IsNotEmpty()
  metodePembayaran: MetodePembayaran;

  @IsString()
  bank: string;

  @IsString()
  buktiPembayaran: string;

  @IsNotEmpty()
  @IsString()
  jenisPengiriman: string;

  @IsNotEmpty()
  @IsBoolean()
  bawaSendiri: boolean;

  statusPengiriman: string;

  @IsString()
  keterangan: string;
}

export class UpdateDataPengirimanDto {
  @IsNotEmpty()
  @IsString()
  namaPengirim: string;

  @IsNotEmpty()
  @Matches(/^[0-9+]+$/)
  @MaxLength(15)
  noWaPengirim: string;

  @IsNotEmpty()
  @IsString()
  namaPenerima: string;

  @IsNotEmpty()
  @Matches(/^[0-9+]+$/)
  @MaxLength(15)
  noWaPenerima: string;

  @IsNotEmpty()
  @IsString()
  kota_tujuan: string;

  @IsNotEmpty()
  @IsDecimal()
  beratBarang: number;

  @IsNotEmpty()
  @IsNumber()
  ongkir: number;

  @IsNotEmpty()
  @IsNumber()
  komisi: number;

  @IsString()
  bank: string;

  @IsString()
  buktiPembayaran: string;

  statusPembayaran: number;

  @IsString()
  keterangan: string;
}