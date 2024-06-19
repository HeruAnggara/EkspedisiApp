import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ProfileService {
    constructor (private prisma: PrismaService) {}

    async index(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                id: true,
                name: true,
                email: true,
                no_wa: true,
                alamat: true,
                created_at: true,
                Level: true,
            }
        })

        if (!user) {
            throw new HttpException('Data Profile User Tidak Ditemukan', HttpStatus.NOT_FOUND)
        }
        try {
            return {
                statusCode: HttpStatus.OK,
                message: `Deta Profile ${user.name}`,
                data: user
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
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

        if (data.password && data.password !== "") {
            const differentPassword = await compare(
                data.password,
                user.password,
            );
    
            if (!differentPassword) {
                const checkPassword = await compare(
                    data.oldPassword,
                    user.password,
                );
        
                if (!checkPassword) {
                  throw new HttpException(
                    'Password Sebelumnya Yang Anda Masukkan Tidak Cocok',
                    HttpStatus.BAD_REQUEST,
                  );
                }
            }
        }

        try {
            const userPassword = data.password && data.password !== "" ? await hash(data.password, 12) : user.password ;
            
            await this.prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name,
                    email: data.email,
                    no_wa: data.no_wa,
                    alamat: data.alamat,
                    password: userPassword,
                    levelId: data.levelId
                  }
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
}
