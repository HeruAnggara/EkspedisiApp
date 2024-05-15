import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}

    private async findDataById(id: string) {
        const detail = await this.prisma.customer.findFirst({
            where: { id: id }
        });
    
        if (!detail) {
            throw new HttpException('Data Customer Tidak Ditemukan', HttpStatus.NOT_FOUND);
        }
    
        return detail;
    }

    async create(data: CustomerDto) {
        try {
            await this.prisma.customer.create({
                data: {
                    nama: data.nama,
                    noWa: data.noWa,
                    email: data.email,
                    alamat: data.alamat,
                    username: data.username ? data.username : null
                }
            });

            const hashPassword = await hash('password', 12);

            if (data.username) {
                await this.prisma.user.create({
                    data: {
                        name: data.nama,
                        no_wa: data.noWa,
                        email: data.email,
                        alamat: data.alamat,
                        username: data.username,
                        password: hashPassword,
                        levelId: 2
                    }
                })
            }

            return {
                statusCode: HttpStatus.CREATED,
                message: 'Data Customer Berhasil Ditambahkan'
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async read() {
        const data = await this.prisma.customer.findMany();

        try {
            return {
                statusCode: HttpStatus.OK,
                message: 'List Data Customer',
                data: data
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async update(data: CustomerDto, id: string) {
        const detail = await this.findDataById(id)

        try {
            await this.prisma.customer.update({
                where: { id: id },
                data: data
            })

            if (detail.username) {
                await this.prisma.user.update({
                    where: { email: detail.email },
                    data: {
                        name: data.nama,
                        no_wa: data.noWa,
                        email: data.email,
                        alamat: data.alamat,
                        username: data.username
                    }
                })
            }

            return {
                statusCode: HttpStatus.OK,
                message: `Data Customer Dengan nama ${detail.nama} Berhasil Diperbarui`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async delete(id: string) {
        const detail = await this.findDataById(id);

        try {
            if (detail.username) {
                await this.prisma.user.delete({
                    where: { email: detail.email }
                })
            }
            await this.prisma.customer.delete({
                where: { id: id }
            }) 

            return {
                statusCode: HttpStatus.OK,
                message: `Data Customer Dengan nama ${detail.nama} Berhasil Dihapus`
            }
        } catch (error) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message
            }
        }
    }

    async detail(id: string) {
        const data = await this.findDataById(id)

        try {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: `Detail Data Customer Dengan nama ${data.nama}`,
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
