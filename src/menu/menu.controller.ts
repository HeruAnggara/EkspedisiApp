import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('menu')
export class MenuController {
    constructor (private menuService: MenuService) {}
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async getLevelsWithMenus() {
        return this.menuService.index();
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('change-permission')
    async changePermission(@Body('levelId') levelId: number, @Body('menuId') menuId: [string]) {
        return this.menuService.changePermission(levelId, menuId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update-position')
    async updatePositionMenu(@Body('position') position: number, @Body() menuId: string) {
        return this.menuService.updatePositionMenu(position, menuId);
    }
}
