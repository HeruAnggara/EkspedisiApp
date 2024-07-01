import { Module } from '@nestjs/common';
import { MerchandiseController } from './merchandise.controller';
import { MerchandiseService } from './merchandise.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MerchandiseController],
  providers: [MerchandiseService]
})
export class MerchandiseModule {}
