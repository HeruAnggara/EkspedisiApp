import { Module } from '@nestjs/common';
import { PemasukanLainService } from './pemasukan-lain.service';
import { PemasukanLainController } from './pemasukan-lain.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PemasukanLainService],
  controllers: [PemasukanLainController]
})
export class PemasukanLainModule {}
