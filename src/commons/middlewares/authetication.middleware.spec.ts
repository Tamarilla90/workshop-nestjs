import { AutheticationMiddleware } from './authetication.middleware';

describe('AutheticationMiddleware', () => {
  it('should be defined', () => {
    expect(new AutheticationMiddleware()).toBeDefined();
  });
});
