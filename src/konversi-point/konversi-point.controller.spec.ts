import { Test, TestingModule } from '@nestjs/testing';
import { KonversiPointController } from './konversi-point.controller';

describe('KonversiPointController', () => {
  let controller: KonversiPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KonversiPointController],
    }).compile();

    controller = module.get<KonversiPointController>(KonversiPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
