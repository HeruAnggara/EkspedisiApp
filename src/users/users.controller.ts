import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { isAdmin } from 'helpers/isAdmin';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.usersService.read();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() data: CreateDto, @Req() req: any) {
        isAdmin(req.user.levelId);
        return await this.usersService.create(data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/update')
    async update(@Param('id') id: string, @Body() data: UpdateDto, @Req() req: any) {
        isAdmin(req.user.levelId);
        return await this.usersService.update(data, id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req: any) {
        isAdmin(req.user.levelId);
        return await this.usersService.delete(id);
    }
   
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.usersService.detail(id);
    }
}
