import { Test, TestingModule } from '@nestjs/testing';
import { JenisPengeluaranService } from './jenis-pengeluaran.service';

describe('JenisPengeluaranService', () => {
  let service: JenisPengeluaranService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JenisPengeluaranService],
    }).compile();

    service = module.get<JenisPengeluaranService>(JenisPengeluaranService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
