import { IsLoggedGuard } from './is-logged.guard';

describe('IsLoggedGuard', () => {
  it('should be defined', () => {
    expect(new IsLoggedGuard()).toBeDefined();
  });
});
