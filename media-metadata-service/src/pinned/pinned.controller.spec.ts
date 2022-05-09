import { Test, TestingModule } from '@nestjs/testing';
import { PinnedController } from './pinned.controller';

describe('PinnedController', () => {
  let controller: PinnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinnedController],
    }).compile();

    controller = module.get<PinnedController>(PinnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
