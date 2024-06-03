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

    async changePermission(levelId: number, menuId: [string]) {

        const menus = await this.prisma.masterMenu.findMany();
        const checkMenu = await Promise.all(
          menuId.map(element =>
            this.prisma.menuPermission.findMany({
              where: {
                levelId: levelId,
                menuId: element,
              },
            })
          )
        );

        const flatCheckMenu = checkMenu.flat();
        try {
            if (flatCheckMenu.length > 0) {              
              await this.prisma.menuPermission.deleteMany({
                where: {
                  levelId: levelId,
                  menuId: {
                    in: menuId,
                  },
                },
              });
            } else {
              await Promise.all(
                menuId.map(element =>
                  this.prisma.menuPermission.create({
                    data: {
                      levelId: levelId,
                      menuId: element,
                    },
                  })
                )
              );
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
        const firstMenu = await this.prisma.masterMenu.findFirst({
          where: {
            id: menuId,
          }
        })

        const secondMenu = await this.prisma.masterMenu.findFirst({
          where: {
            position: position,
            parentId: 0
          }
        })

        try {
            await this.prisma.masterMenu.update({
              where: {
                id: secondMenu.id
              },
              data: {
                position: firstMenu.position
              }
            })

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
