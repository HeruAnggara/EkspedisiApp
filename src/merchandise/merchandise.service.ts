import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MerchandiseDto } from './dto/merchandise.dto';
import * as fs from 'fs';

@Injectable()
export class MerchandiseService {
    constructor (private prisma: PrismaService) {}

    private async findMerchandiseById(id: string) {
        const detail = await this.prisma.merchandise.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Merchandise Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: MerchandiseDto) {
        await this.prisma.merchandise.create({
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Merchandise Berhasil Dibuat'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.merchandise.findMany();

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'List Data Merchandise',
                data: data
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: MerchandiseDto, id: string) {
        const detail = await this.findMerchandiseById(id);

        const filePath = `public/uploads/image/${detail.gambar}`;
        
        await fs.promises.unlink(filePath);  

        await this.prisma.merchandise.update({
            where: { id: id },
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Merchandise Berhasil Diperbarui'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findMerchandiseById(id);

        await this.prisma.merchandise.delete({
            where: { id: id}
        })

        try {

            const filePath = `public/uploads/image/${detail.gambar}`;
        
            await fs.promises.unlink(filePath);  
            
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Merchandise Berhasil Dihapus'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findMerchandiseById(id);
        
        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Detail Data Merchandise',
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
