import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BankDto } from './dto/bank.dto';
import { BankService } from './bank.service';

describe('BankService', () => {
  let service: BankService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    bank: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BankService>(BankService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findBankById', () => {
    it('should return bank detail if found', async () => {
      const bankDetail = { id: '1', namaBank: 'Test Bank', cabang: 'Cabang 1', noRekening: '1234567890', namaPemilik: 'Pemilik 1' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);

      expect(await service['findBankById']('1')).toEqual(bankDetail);
    });

    it('should throw an exception if bank not found', async () => {
      mockPrismaService.bank.findFirst.mockResolvedValue(null);

      await expect(service['findBankById']('1')).rejects.toThrow(HttpException);
    });
  });

  describe('create', () => {
    it('should create a new bank', async () => {
      const bankData: BankDto = {
        namaBank: 'New Bank',
        cabang: 'Cabang Baru',
        noRekening: '0987654321',
        namaPemilik: 'Pemilik Baru'
      };
      mockPrismaService.bank.create.mockResolvedValue(bankData);

      expect(await service.create(bankData)).toEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Data Bank Berhasil Dibuat',
      });
    });

    it('should handle errors', async () => {
      mockPrismaService.bank.create.mockRejectedValue(new Error('Failed to create'));

      expect(await service.create({
        namaBank: 'New Bank',
        cabang: 'Cabang Baru',
        noRekening: '0987654321',
        namaPemilik: 'Pemilik Baru'
      })).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to create',
      });
    });
  });

  describe('read', () => {
    it('should return list of banks', async () => {
      const bankList = [{ id: '1', namaBank: 'Bank 1', cabang: 'Cabang 1', noRekening: '1234567890', namaPemilik: 'Pemilik 1' }];
      mockPrismaService.bank.findMany.mockResolvedValue(bankList);

      expect(await service.read()).toEqual({
        statusCode: HttpStatus.OK,
        message: 'List Data Bank',
        data: bankList,
      });
    });

    it('should handle errors', async () => {
      mockPrismaService.bank.findMany.mockRejectedValue(new Error('Failed to read'));

      expect(await service.read()).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to read',
      });
    });
  });

  describe('update', () => {
    it('should update a bank', async () => {
      const bankDetail = { id: '1', namaBank: 'Updated Bank', cabang: 'Updated Cabang', noRekening: '0987654321', namaPemilik: 'Updated Pemilik' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);
      mockPrismaService.bank.update.mockResolvedValue(bankDetail);

      expect(await service.update(bankDetail, '1')).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Diperbarui',
      });
    });

    it('should handle errors', async () => {
      const bankDetail = { id: '1', namaBank: 'Updated Bank', cabang: 'Updated Cabang', noRekening: '0987654321', namaPemilik: 'Updated Pemilik' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);
      mockPrismaService.bank.update.mockRejectedValue(new Error('Failed to update'));

      expect(await service.update(bankDetail, '1')).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to update',
      });
    });
  });

  describe('delete', () => {
    it('should delete a bank', async () => {
      const bankDetail = { id: '1', namaBank: 'Bank to delete', cabang: 'Cabang Delete', noRekening: '1234567890', namaPemilik: 'Pemilik Delete' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);
      mockPrismaService.bank.delete.mockResolvedValue(bankDetail);

      expect(await service.delete('1')).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Data Bank Berhasil Dihapus',
      });
    });

    it('should handle errors', async () => {
      const bankDetail = { id: '1', namaBank: 'Bank to delete', cabang: 'Cabang Delete', noRekening: '1234567890', namaPemilik: 'Pemilik Delete' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);
      mockPrismaService.bank.delete.mockRejectedValue(new Error('Failed to delete'));

      expect(await service.delete('1')).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete',
      });
    });
  });

  describe('detail', () => {
    it('should return bank detail', async () => {
      const bankDetail = { id: '1', namaBank: 'Detail Bank', cabang: 'Detail Cabang', noRekening: '1234567890', namaPemilik: 'Pemilik Detail' };
      mockPrismaService.bank.findFirst.mockResolvedValue(bankDetail);

      expect(await service.detail('1')).toEqual({
        statusCode: HttpStatus.OK,
        message: 'Detail Data Bank',
        data: bankDetail,
      });
    });

    it('should handle errors', async () => {
      mockPrismaService.bank.findFirst.mockRejectedValue(new Error('Failed to get detail'));

      expect(await service.detail('1')).toEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to get detail',
      });
    });
  });
});
