import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MerchandiseDto } from './dto/merchandise.dto';
import { isAdmin } from 'helpers/isAdmin';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('merchandise')
export class MerchandiseController {
    constructor (private merchandise: MerchandiseService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('gambar', {
          storage: diskStorage({
            destination: 'public/uploads/merchandise',
            filename: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, uniqueSuffix + extname(file.originalname));
            },
          }),
          fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.jpeg', '.png', '.jpg'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            const fileExtension = extname(file.originalname).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              return cb(new Error('Only JPEG, PNG, or JPG files are allowed'), false);
            }

            if (file.size > maxSize) {
              return cb(new Error('File size cannot exceed 2 MB'), false);
            }

            cb(null, true);
          }
        }),
      )
    @Post()
    async create(
        @Body() data: MerchandiseDto, 
        @Req() req,
        @UploadedFile(new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 2000000 }),
              new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg)/ }),
            ],
          })) file: Express.Multer.File,
    ) {
        isAdmin(req.user.levelId);
        return await this.merchandise.create(data);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    async read() {
        return await this.merchandise.read();
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('gambar', {
          storage: diskStorage({
            destination: 'public/uploads/merchandise',
            filename: (req, file, cb) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, uniqueSuffix + extname(file.originalname));
            },
          }),
          fileFilter: (req, file, cb) => {
            const allowedExtensions = ['.jpeg', '.png', '.jpg'];
            const maxSize = 2 * 1024 * 1024; // 2MB

            const fileExtension = extname(file.originalname).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
              return cb(new Error('Only JPEG, PNG, or JPG files are allowed'), false);
            }

            if (file.size > maxSize) {
              return cb(new Error('File size cannot exceed 2 MB'), false);
            }
            
            cb(null, true);
          }
        }),
      )
    @Put(':id/update')
    async update(
        @Body() data: MerchandiseDto, 
        @Param('id') id: string, 
        @Req() req,
        @UploadedFile(new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 2000000 }),
              new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg)/ }),
            ],
          })) file: Express.Multer.File
    ) {
        isAdmin(req.user.levelId);
        return await this.merchandise.update(data, id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id/delete')
    async delete(@Param('id') id: string, @Req() req) {
        isAdmin(req.user.levelId);
        return await this.merchandise.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async detail(@Param('id') id: string) {
        return await this.merchandise.detail(id);
    }
}
