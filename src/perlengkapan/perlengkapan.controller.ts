import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PerlengkapanService } from './perlengkapan.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PerlengkapanDto } from './dto/perlengkapan.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('perlengkapan')
export class PerlengkapanController {
    constructor(private perlengkapan: PerlengkapanService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: PerlengkapanDto, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.perlengkapan.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.perlengkapan.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: PerlengkapanDto, @Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.perlengkapan.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.perlengkapan.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.perlengkapan.detail(id);
    }
}
