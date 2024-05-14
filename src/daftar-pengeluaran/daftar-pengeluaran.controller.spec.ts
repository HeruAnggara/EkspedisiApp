import { Test, TestingModule } from '@nestjs/testing';
import { DaftarPengeluaranController } from './daftar-pengeluaran.controller';

describe('DaftarPengeluaranController', () => {
  let controller: DaftarPengeluaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DaftarPengeluaranController],
    }).compile();

    controller = module.get<DaftarPengeluaranController>(DaftarPengeluaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
