import { Test, TestingModule } from '@nestjs/testing';
import { PreferredController } from './preferred.controller';
import { PreferredService } from './preferred.service';

describe('PreferredController', () => {
  let controller: PreferredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferredController],
      providers: [PreferredService],
    }).compile();

    controller = module.get<PreferredController>(PreferredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
