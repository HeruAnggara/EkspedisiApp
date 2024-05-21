import { Module } from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { LaporanController } from './laporan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LaporanService],
  controllers: [LaporanController]
})
export class LaporanModule {}
