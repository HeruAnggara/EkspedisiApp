import { Module } from '@nestjs/common';
import { JenisPengeluaranService } from './jenis-pengeluaran.service';
import { JenisPengeluaranController } from './jenis-pengeluaran.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [JenisPengeluaranService],
  controllers: [JenisPengeluaranController]
})
export class JenisPengeluaranModule {}
