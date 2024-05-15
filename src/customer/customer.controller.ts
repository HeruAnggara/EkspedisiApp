import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private customer: CustomerService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.customer.read();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: CustomerDto) {
        return await this.customer.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async update(@Param('id') id: string, @Body() data: CustomerDto) {
        return await this.customer.update(data, id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string) {
        return await this.customer.delete(id);
    }
   
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.customer.detail(id);
    }
}
