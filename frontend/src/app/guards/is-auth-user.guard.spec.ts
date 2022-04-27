import { TestBed } from '@angular/core/testing';

import { IsAuthUserGuard } from './is-auth-user.guard';

describe('IsAuthUserGuard', () => {
  let guard: IsAuthUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
