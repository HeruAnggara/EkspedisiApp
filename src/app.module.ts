import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { ProfileModule } from './profile/profile.module';
import { JenisPengeluaranModule } from './jenis-pengeluaran/jenis-pengeluaran.module';
import { PerlengkapanModule } from './perlengkapan/perlengkapan.module';
import { SupplierModule } from './supplier/supplier.module';
import { DaftarPengeluaranModule } from './daftar-pengeluaran/daftar-pengeluaran.module';
import { PemasukanLainModule } from './pemasukan-lain/pemasukan-lain.module';
import { PembelianPerlengkapanModule } from './pembelian-perlengkapan/pembelian-perlengkapan.module';
import { CustomerModule } from './customer/customer.module';
import { DataPengirimanModule } from './data-pengiriman/data-pengiriman.module';
import { LaporanModule } from './laporan/laporan.module';
import { KonversiPointModule } from './konversi-point/konversi-point.module';
import { MenuModule } from './menu/menu.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { BankModule } from './bank/bank.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ProfileModule, JenisPengeluaranModule, PerlengkapanModule, SupplierModule, DaftarPengeluaranModule, PemasukanLainModule, PembelianPerlengkapanModule, CustomerModule, DataPengirimanModule, LaporanModule, KonversiPointModule, MenuModule, MerchandiseModule, BankModule, 
    MailerModule.forRoot({
      transport: 'smtp://localhost:25',
      defaults: {
          from: 'noreply@emailsaya.com',
      },
      template: {
          dir: process.cwd() + '/mail',
          adapter: new HandlebarsAdapter(),
          options: {
              strict: false,
          },
      },
  })],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
