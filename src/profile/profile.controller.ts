import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateDto } from './dto/update.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profile: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Req() req){
        const userId = req.user.userId;
        return await this.profile.index(userId);
    }
    
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateProfile(@Body() data: UpdateDto ,@Req() req){
        const userId = req.user.userId;
        return await this.profile.update(data ,userId);
    }
}
