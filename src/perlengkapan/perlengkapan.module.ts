import { Module } from '@nestjs/common';
import { PerlengkapanService } from './perlengkapan.service';
import { PerlengkapanController } from './perlengkapan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PerlengkapanService],
  controllers: [PerlengkapanController]
})
export class PerlengkapanModule {}
