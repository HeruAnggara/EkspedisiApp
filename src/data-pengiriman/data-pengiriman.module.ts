import { Module } from '@nestjs/common';
import { DataPengirimanService } from './data-pengiriman.service';
import { DataPengirimanController } from './data-pengiriman.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DataPengirimanService],
  controllers: [DataPengirimanController]
})
export class DataPengirimanModule {}
