import { Test, TestingModule } from '@nestjs/testing';
import { PreferredService } from './preferred.service';

describe('PreferredService', () => {
  let service: PreferredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreferredService],
    }).compile();

    service = module.get<PreferredService>(PreferredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
