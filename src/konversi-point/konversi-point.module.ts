import { Module } from '@nestjs/common';
import { KonversiPointController } from './konversi-point.controller';
import { KonversiPointService } from './konversi-point.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [KonversiPointController],
  providers: [KonversiPointService]
})
export class KonversiPointModule {}
