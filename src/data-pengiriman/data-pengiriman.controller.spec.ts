import { Test, TestingModule } from '@nestjs/testing';
import { DataPengirimanController } from './data-pengiriman.controller';

describe('DataPengirimanController', () => {
  let controller: DataPengirimanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataPengirimanController],
    }).compile();

    controller = module.get<DataPengirimanController>(DataPengirimanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
