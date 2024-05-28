import { Test, TestingModule } from '@nestjs/testing';
import { KonversiPointService } from './konversi-point.service';

describe('KonversiPointService', () => {
  let service: KonversiPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KonversiPointService],
    }).compile();

    service = module.get<KonversiPointService>(KonversiPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
