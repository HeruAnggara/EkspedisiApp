import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { ProfileModule } from './profile/profile.module';
import { JenispengeluaranModule } from './jenispengeluaran/jenispengeluaran.module';
import { JenisPengeluaranModule } from './jenis-pengeluaran/jenis-pengeluaran.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ProfileModule, JenispengeluaranModule, JenisPengeluaranModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
