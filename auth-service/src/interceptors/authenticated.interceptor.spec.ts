import { AuthenticatedInterceptor } from './authenticated.interceptor';

describe('AuthenticatedInterceptor', () => {
  it('should be defined', () => {
    expect(new AuthenticatedInterceptor()).toBeDefined();
  });
});
