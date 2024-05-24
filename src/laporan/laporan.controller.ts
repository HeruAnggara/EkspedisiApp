import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { LaporanService } from './laporan.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('laporan')
export class LaporanController {
    constructor(private laporan: LaporanService) {}

    @UseGuards(JwtAuthGuard)
    @Get('laba-rugi')
    async labaRugi(@Query('start') start: Date, @Query('end') end: Date) {
        return await this.laporan.labaRugi(start, end);
    }
    @UseGuards(JwtAuthGuard)
    @Get('transaksi-harian')
    async transaksiHarian(@Query('start') start: Date, @Query('end') end: Date) {
        return await this.laporan.transaksiHarian(start, end);
    }
    // @UseGuards(JwtAuthGuard)
    @Get('export/pdf/laba-rugi')
    async exportLabaRugi(@Res() res: Response, @Query('start') start: Date, @Query('end') end: Date) {
        return await this.laporan.exportLabaRugi(res, start, end);
    }
    
}
