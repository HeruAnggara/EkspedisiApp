import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JenisPengeluaranDto } from './dto/jenis-pengeluaran.dto';

@Injectable()
export class JenisPengeluaranService {
    constructor(private prisma: PrismaService) {}

    private async findJenisPengeluaranById(id: string) {
        const detail = await this.prisma.jenisPengeluaran.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Jenis Pengeluaran Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: JenisPengeluaranDto) {
        await this.prisma.jenisPengeluaran.create({
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Jenis Pengeluaran Berhasil Dibuat'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.jenisPengeluaran.findMany();

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'List Data Jenis Pengeluaran',
                data: data
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: JenisPengeluaranDto, id: string) {
        const detail = await this.findJenisPengeluaranById(id);

        await this.prisma.jenisPengeluaran.update({
            where: { id: id },
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Jenis Pengeluaran Berhasil Diperbarui'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findJenisPengeluaranById(id);

        await this.prisma.jenisPengeluaran.delete({
            where: { id: id}
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Jenis Pengeluaran Berhasil Dihapus'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findJenisPengeluaranById(id);
        
        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Detail Data Jenis Pengeluaran',
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
