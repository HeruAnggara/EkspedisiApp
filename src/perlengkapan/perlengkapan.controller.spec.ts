import { Test, TestingModule } from '@nestjs/testing';
import { PerlengkapanController } from './perlengkapan.controller';

describe('PerlengkapanController', () => {
  let controller: PerlengkapanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerlengkapanController],
    }).compile();

    controller = module.get<PerlengkapanController>(PerlengkapanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
