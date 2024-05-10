import { Test, TestingModule } from '@nestjs/testing';
import { JenisPengeluaranController } from './jenis-pengeluaran.controller';

describe('JenisPengeluaranController', () => {
  let controller: JenisPengeluaranController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JenisPengeluaranController],
    }).compile();

    controller = module.get<JenisPengeluaranController>(JenisPengeluaranController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
