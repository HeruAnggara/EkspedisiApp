import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {hash} from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

export type User = any;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDto) {
      try {
        if (data.password !== data.password_confirm) {
          throw new HttpException('Password konfirmasi tidak cocok dengan password', HttpStatus.BAD_REQUEST);
        } 

        data.password = await hash(data.password, 12);

        await this.prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
            no_wa: data.no_wa,
            alamat: data.alamat,
            password: data.password,
            levelId: data.levelId
          }
        })

        return {
          statusCode: HttpStatus.CREATED,
          message: "Data user Berhasil Ditambahkan"
        }
      } catch (error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        } 
      }
    }
  
    async read() {
      try {
        const users = await this.prisma.user.findMany();

        return {
          statusCode: HttpStatus.OK,
          message: 'Data Semua User',
          data: users
        }
      } catch (error) {
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message
        } 
      }
    }

    async update(data: UpdateDto, id: string) {
      const user = await this.prisma.user.findFirst({
        where: {id: id}
      })
      
      if (!user) {
        throw new HttpException(`Data User Tidak ditemukan`, HttpStatus.NOT_FOUND);
      }

      try {
        await this.prisma.user.update({
          where: { id: id },
          data: data
        });

        return {
          statusCode: HttpStatus.OK,
          message: `Data ${user.name} Berhasil Diupdate`
        }
      } catch (error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        } 
      }
    }

    async delete(id: string) {
      const user = await this.prisma.user.findFirst({
        where: {id: id}
      })
      
      if (!user) {
        throw new HttpException(`Data User Tidak ditemukan`, HttpStatus.NOT_FOUND);
      }

      try {
        await this.prisma.user.delete({
          where: {id: id}
        })

        return {
          statusCode: HttpStatus.OK,
          message: `Data ${user.name} Berhasil Dihapus`
        }
      } catch (error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        } 
      }
    }

    async detail(id: string) {
      const user = await this.prisma.user.findFirst({
        where: {id: id},
        select: {
          id: true, 
          name: true, 
          email: true,
          no_wa: true,
          alamat: true,
          Level: {
            select: {
              level: true
            }
          }
        }
      })
      
      if (!user) {
        throw new HttpException(`Data User Tidak ditemukan`, HttpStatus.NOT_FOUND);
      }

      try {
        return {
          statusCode: HttpStatus.OK,
          message: `Detail Data ${user.name}`,
          data: user
        }
      } catch (error) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message
        } 
      }
    }
  }
