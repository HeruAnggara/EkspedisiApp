import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
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
    @Patch()
    async update(@Body() nominal: number, @Body() id: string) {
        return await this.KonversiService.update(nominal, id);
    }
}
