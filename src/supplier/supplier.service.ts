import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierDto } from './dto/supplier.dto';

@Injectable()
export class SupplierService {
    constructor(private prisma: PrismaService) {}

    private async findSupplierById(id: string) {
        const detail = await this.prisma.supplier.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Supplier Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: SupplierDto) {
        try {
            await this.prisma.supplier.create({
                data: data
            });

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data SUpplier Berhasil Ditambahkan'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.supplier.findMany();

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'List Data Supplier',
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: SupplierDto, id: string) {
        const detail = await this.findSupplierById(id)

        try {
            await this.prisma.supplier.update({
                where: { id: id },
                data: data
            })

            return {
                statusCode: HttpStatus.OK,
                message: `Data Supplier Dengan nama ${detail.namaSupplier} Berhasil Diperbarui`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findSupplierById(id);

        try {
            await this.prisma.supplier.delete({
                where: { id: id }
            }) 

            return {
                statusCode: HttpStatus.OK,
                message: `Data Supplier Dengan nama ${detail.namaSupplier} Berhasil Dihapus`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findSupplierById(id)

        try {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Detail Data Supplier Dengan nama ${detail.namaSupplier}',
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }
}
