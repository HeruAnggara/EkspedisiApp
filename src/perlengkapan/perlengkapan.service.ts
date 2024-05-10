import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PerlengkapanDto } from './dto/perlengkapan.dto';

@Injectable()
export class PerlengkapanService {
    constructor(private prisma: PrismaService) {}

    private async findPerlengkapanById(id: string) {
        const detail = await this.prisma.perlengkapan.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Perlengkapan Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: PerlengkapanDto) {
        await this.prisma.perlengkapan.create({
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Perlengkapan Berhasil Dibuat'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.perlengkapan.findMany();

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'List Data Perlengkapan',
                data: data
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: PerlengkapanDto, id: string) {
        const detail = await this.findPerlengkapanById(id);

        await this.prisma.perlengkapan.update({
            where: { id: id },
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Perlengkapan Berhasil Diperbarui'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findPerlengkapanById(id);

        await this.prisma.perlengkapan.delete({
            where: { id: id}
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Perlengkapan Berhasil Dihapus'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findPerlengkapanById(id);
        
        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Detail Data Perlengkapan',
                data: data
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
