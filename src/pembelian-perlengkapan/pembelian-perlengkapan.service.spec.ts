import { Test, TestingModule } from '@nestjs/testing';
import { PembelianPerlengkapanService } from './pembelian-perlengkapan.service';

describe('PembelianPerlengkapanService', () => {
  let service: PembelianPerlengkapanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PembelianPerlengkapanService],
    }).compile();

    service = module.get<PembelianPerlengkapanService>(PembelianPerlengkapanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
