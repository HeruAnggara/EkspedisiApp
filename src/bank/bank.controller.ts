import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BankService } from './bank.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BankDto } from './dto/bank.dto';

@Controller('bank')
export class BankController {
    constructor (private Bank: BankService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: BankDto) {
        return await this.Bank.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.Bank.read();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Body() data: BankDto, @Param('id') id: string,) {
        return await this.Bank.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        return await this.Bank.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.Bank.detail(id);
    }
}
