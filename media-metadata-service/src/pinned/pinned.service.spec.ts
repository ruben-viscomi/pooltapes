import { Test, TestingModule } from '@nestjs/testing';
import { PinnedService } from './pinned.service';

describe('PinnedService', () => {
  let service: PinnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinnedService],
    }).compile();

    service = module.get<PinnedService>(PinnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
