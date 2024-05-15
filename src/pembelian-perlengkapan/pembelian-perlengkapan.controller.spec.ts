import { Test, TestingModule } from '@nestjs/testing';
import { PembelianPerlengkapanController } from './pembelian-perlengkapan.controller';

describe('PembelianPerlengkapanController', () => {
  let controller: PembelianPerlengkapanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PembelianPerlengkapanController],
    }).compile();

    controller = module.get<PembelianPerlengkapanController>(PembelianPerlengkapanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
