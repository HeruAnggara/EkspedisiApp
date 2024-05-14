import { Module } from '@nestjs/common';
import { DaftarPengeluaranController } from './daftar-pengeluaran.controller';
import { DaftarPengeluaranService } from './daftar-pengeluaran.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DaftarPengeluaranController],
  providers: [DaftarPengeluaranService]
})
export class DaftarPengeluaranModule {}
