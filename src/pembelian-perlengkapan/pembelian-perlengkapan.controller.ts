import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PembelianPerlengkapanService } from './pembelian-perlengkapan.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PembelianPerlengkapanDto } from './dto/pembelian-perlengkapan.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('pembelian-perlengkapan')
export class PembelianPerlengkapanController {
    constructor(private pembelian: PembelianPerlengkapanService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: PembelianPerlengkapanDto, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pembelian.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.pembelian.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: PembelianPerlengkapanDto, @Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pembelian.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pembelian.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.pembelian.detail(id);
    }
}
