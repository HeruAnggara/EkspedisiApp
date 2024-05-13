import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SupplierDto } from './dto/supplier.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('supplier')
export class SupplierController {
    constructor(private supplier: SupplierService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: SupplierDto, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.supplier.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.supplier.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: SupplierDto, @Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.supplier.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.supplier.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.supplier.detail(id);
    }
}
