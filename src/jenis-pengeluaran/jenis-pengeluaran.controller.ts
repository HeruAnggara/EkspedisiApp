import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JenisPengeluaranService } from './jenis-pengeluaran.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JenisPengeluaranDto } from './dto/jenis-pengeluaran.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('jenis-pengeluaran')
export class JenisPengeluaranController {
    constructor(private jenisPengeluaran: JenisPengeluaranService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: JenisPengeluaranDto, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.jenisPengeluaran.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.jenisPengeluaran.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: JenisPengeluaranDto, @Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.jenisPengeluaran.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.jenisPengeluaran.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.jenisPengeluaran.detail(id);
    }
}
