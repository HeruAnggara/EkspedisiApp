import { Test, TestingModule } from '@nestjs/testing';
import { PerlengkapanService } from './perlengkapan.service';

describe('PerlengkapanService', () => {
  let service: PerlengkapanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerlengkapanService],
    }).compile();

    service = module.get<PerlengkapanService>(PerlengkapanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
