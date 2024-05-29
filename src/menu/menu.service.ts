import { HttpStatus, Injectable } from '@nestjs/common';
import { Level as PrismaLevel, MasterMenu as PrismaMasterMenu } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type LevelWithMenu = PrismaLevel & {
  menu: PrismaMasterMenu[];
};

@Injectable()
export class MenuService {
    constructor (private prisma: PrismaService) {}

    async index() {
        const levels: PrismaLevel[] = await this.prisma.level.findMany({
            orderBy: {
              id: 'asc',
            },
          });
      
          const levelsWithMenus: LevelWithMenu[] = await Promise.all(
            levels.map(async (level) => {
              const menus = await this.prisma.masterMenu.findMany({
                where: {
                  MenuPermission: {
                    some: {
                      levelId: level.id,
                    },
                  },
                },
                orderBy: {
                  id: 'asc',
                },
                include: {
                  MenuPermission: true,
                },
              });
      
              return {
                ...level,
                menu: menus,
              };
            })
          );
        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Level with Menu Permission',
                data: levelsWithMenus
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async changePermission(levelId: number, menuId: string) {
        const menu = await this.prisma.menuPermission.findFirst({
          where: {
            levelId: levelId,
          }
        });
        try {
            if (menu) {
              await this.prisma.menuPermission.delete({
                where: {
                  id: menu.id
                }
              })
            }

            const menus = [];
            for (let index = 0; index < menus.length; index++) {
              const item = menus[index];
              await this.prisma.menuPermission.create({
                data: {
                  levelId: levelId,
                  menuId: item
                }
              })
            }

            return {
              statusCode: HttpStatus.CREATED,
              message: 'Data Menu Permission Berhasil Diubah'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async updatePositionMenu(position: number, menuId: string) {
        try {
            await this.prisma.masterMenu.update({
              where: {
                id: menuId
              },
              data: {
                position: position
              }
            })

            return {
              statusCode: HttpStatus.OK,
              message: 'Posisi Data Menu Berhasil Diubah'
            }
        } catch (error) {
            return { 
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
