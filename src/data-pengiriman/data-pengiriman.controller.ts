import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DataPengirimanService } from './data-pengiriman.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataPengirimanDto, UpdateDataPengirimanDto } from './dto/data-pengiriman.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('data-pengiriman')
export class DataPengirimanController {
    constructor(private dataPengiriman: DataPengirimanService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: DataPengirimanDto) {
        return await this.dataPengiriman.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.dataPengiriman.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: UpdateDataPengirimanDto, @Param('id') id: string) {
        return await this.dataPengiriman.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        return await this.dataPengiriman.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.dataPengiriman.detail(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id/update/status-pengiriman')
    async updateStatusPengiriman(@Body('status') status: string, @Param('id') id: string) {
        return await this.dataPengiriman.updateStatusPengiriman(status, id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id/update/status-pembayaran')
    async updateStatusPembayaran(@Param('id') id: string) {
        return await this.dataPengiriman.updateStatusPembayaran(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('import/excel')
    @UseInterceptors(FileInterceptor('file'))
    async importData(@UploadedFile() file: Express.Multer.File) {
        return this.dataPengiriman.importExcel(file);
    }
}
