import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { DaftarPengeluaranService } from './daftar-pengeluaran.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DaftarPengeluaranDto } from './dto/daftar-pengeluaran.dto';

@Controller('daftar-pengeluaran')
export class DaftarPengeluaranController {
    constructor(private daftarPengeluaran: DaftarPengeluaranService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: DaftarPengeluaranDto, @Req() req) {
        const userId = req.user.sub;
        return await this.daftarPengeluaran.create(data, userId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.daftarPengeluaran.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: DaftarPengeluaranDto, @Param('id') id: string,) {
        return await this.daftarPengeluaran.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        return await this.daftarPengeluaran.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.daftarPengeluaran.detail(id);
    }
}
