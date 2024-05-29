import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { KonversiPointService } from './konversi-point.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('konversi-point')
export class KonversiPointController {
    constructor (private KonversiService: KonversiPointService){} 

    @UseGuards(JwtAuthGuard)
    @Get()
    async index() {
        return await this.KonversiService.index();
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Body('nominal') nominal: number, @Param('id') id: string) {
        return await this.KonversiService.update(nominal, id);
    }
}
