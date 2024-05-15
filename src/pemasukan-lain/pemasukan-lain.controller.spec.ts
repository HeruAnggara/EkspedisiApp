import { Test, TestingModule } from '@nestjs/testing';
import { PemasukanLainController } from './pemasukan-lain.controller';

describe('PemasukanLainController', () => {
  let controller: PemasukanLainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemasukanLainController],
    }).compile();

    controller = module.get<PemasukanLainController>(PemasukanLainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
