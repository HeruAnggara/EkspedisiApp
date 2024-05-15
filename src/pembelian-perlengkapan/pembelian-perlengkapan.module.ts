import { Module } from '@nestjs/common';
import { PembelianPerlengkapanService } from './pembelian-perlengkapan.service';
import { PembelianPerlengkapanController } from './pembelian-perlengkapan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PembelianPerlengkapanService],
  controllers: [PembelianPerlengkapanController]
})
export class PembelianPerlengkapanModule {}
