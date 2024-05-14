import { Test, TestingModule } from '@nestjs/testing';
import { DaftarPengeluaranService } from './daftar-pengeluaran.service';

describe('DaftarPengeluaranService', () => {
  let service: DaftarPengeluaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DaftarPengeluaranService],
    }).compile();

    service = module.get<DaftarPengeluaranService>(DaftarPengeluaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
