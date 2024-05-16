import { Test, TestingModule } from '@nestjs/testing';
import { DataPengirimanService } from './data-pengiriman.service';

describe('DataPengirimanService', () => {
  let service: DataPengirimanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataPengirimanService],
    }).compile();

    service = module.get<DataPengirimanService>(DataPengirimanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
