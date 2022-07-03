import {RoleGuard} from './role.guard';
import {Reflector} from "@nestjs/core";

describe('RoleGuard', () => {

  const reflectorMock: Reflector = {
    getAllAndOverride: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    getAllAndMerge: jest.fn()
  }

  it('should be defined', () => {
    expect(new RoleGuard(reflectorMock)).toBeDefined();
  });


});
