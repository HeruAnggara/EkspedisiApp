import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('laporan')
export class LaporanController {
    constructor(private laporan: LaporanService) {}

    @UseGuards(JwtAuthGuard)
    @Get('laba-rugi/:start/:end')
    async labaRugi(@Query('start') start: string, @Query('end') end: string) {
        return await this.laporan.labaRugi(start, end);
    }
    @UseGuards(JwtAuthGuard)
    @Get('transaksi-harian/:start/:end')
    async transaksiHarian(@Query('start') start: string, @Query('end') end: string) {
        return await this.laporan.transaksiHarian(start, end);
    }
    
}
