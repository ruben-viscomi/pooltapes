import { TestBed } from '@angular/core/testing';

import { IsAuthAdminGuard } from './is-auth-admin.guard';

describe('IsAuthAdminGuard', () => {
  let guard: IsAuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
