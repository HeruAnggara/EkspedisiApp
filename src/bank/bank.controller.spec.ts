import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpStatus } from '@nestjs/common';
import { BankDto } from './dto/bank.dto';

describe('BankController', () => {
  let controller: BankController;
  let service: BankService;

  const mockBankService = {
    create: jest.fn(dto => {
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Data Bank Berhasil Dibuat'
      };
    }),
    read: jest.fn(() => {
      return {
        statusCode: HttpStatus.OK,
        message: 'List Data Bank',
        data: [{ id: '1', namaBank: 'Bank 1', cabang: 'Cabang 1', noRekening: '1234567890', namaPemilik: 'Pemilik 1' }]
      };
    }),
    update: jest.fn((dto, id) => {
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Diperbarui'
      };
    }),
    delete: jest.fn(id => {
      return {
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Dihapus'
      };
    }),
    detail: jest.fn(id => {
      return {
        statusCode: HttpStatus.OK,
        message: 'Detail Data Bank',
        data: { id: '1', namaBank: 'Detail Bank', cabang: 'Detail Cabang', noRekening: '1234567890', namaPemilik: 'Pemilik Detail' }
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        {
          provide: BankService,
          useValue: mockBankService,
        },
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

    controller = module.get<BankController>(BankController);
    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bank', async () => {
      const dto: BankDto = { namaBank: 'Bank A', cabang: 'Cabang A', noRekening: '1234567890', namaPemilik: 'Pemilik A' };
      expect(await controller.create(dto)).toEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Data Bank Berhasil Dibuat'
      });
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('read', () => {
    it('should return list of banks', async () => {
      expect(await controller.read()).toEqual({
        statusCode: HttpStatus.OK,
        message: 'List Data Bank',
        data: [{ id: '1', namaBank: 'Bank 1', cabang: 'Cabang 1', noRekening: '1234567890', namaPemilik: 'Pemilik 1' }]
      });
      expect(service.read).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a bank', async () => {
      const dto: BankDto = { namaBank: 'Bank B', cabang: 'Cabang B', noRekening: '0987654321', namaPemilik: 'Pemilik B' };
      const id = '1';
      expect(await controller.update(dto, id)).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Diperbarui'
      });
      expect(service.update).toHaveBeenCalledWith(dto, id);
    });
  });

  describe('delete', () => {
    it('should delete a bank', async () => {
      const id = '1';
      expect(await controller.delete(id)).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Dihapus'
      });
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('detail', () => {
    it('should return bank detail', async () => {
      const id = '1';
      expect(await controller.detail(id)).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Detail Data Bank',
        data: { id: '1', namaBank: 'Detail Bank', cabang: 'Detail Cabang', noRekening: '1234567890', namaPemilik: 'Pemilik Detail' }
      });
      expect(service.detail).toHaveBeenCalledWith(id);
    });
  });
});
