import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PemasukanLainService } from './pemasukan-lain.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PemasukanLainDto } from './dto/pemasukan-lain.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('pemasukan-lain')
export class PemasukanLainController {
    constructor(private pemasukkan: PemasukanLainService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: PemasukanLainDto, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pemasukkan.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.pemasukkan.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: PemasukanLainDto, @Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pemasukkan.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.pemasukkan.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.pemasukkan.detail(id);
    }
}
