import { Test, TestingModule } from '@nestjs/testing';
import { PemasukanLainService } from './pemasukan-lain.service';

describe('PemasukanLainService', () => {
  let service: PemasukanLainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemasukanLainService],
    }).compile();

    service = module.get<PemasukanLainService>(PemasukanLainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
