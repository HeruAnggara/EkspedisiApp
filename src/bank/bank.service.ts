import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BankDto } from './dto/bank.dto';

@Injectable()
export class BankService {
    constructor (private prisma: PrismaService) {}

    private async findBankById(id: string) {
        const detail = await this.prisma.bank.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Merchandise Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: BankDto) {
        await this.prisma.bank.create({
            data
        })

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Bank Berhasil Dibuat'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.bank.findMany();

        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'List Data Bank',
                data: data
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: BankDto, id: string) {
        const detail = await this.findBankById(id);

        await this.prisma.bank.update({
            where: { id: id },
            data: data
        })

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Bank Berhasil Diperbarui'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findBankById(id);

        try {
            await this.prisma.bank.delete({
                where: { id: id}
            })
            
            return {
                statusCode: HttpStatus.OK,
                message: 'Data Bank Berhasil Dihapus'
            }
        } catch (error) {
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findBankById(id);
        
        try {
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Detail Data Bank',
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
