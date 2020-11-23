import { Reflector } from '@nestjs/core';
import { IsAuthorizedGuard } from './is-authorized.guard';

describe('IsAuthorizedGuard', () => {
  it('should be defined', () => {
    expect(new IsAuthorizedGuard(new Reflector())).toBeDefined();
  });
});
