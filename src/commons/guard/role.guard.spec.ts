import {RoleGuard} from './role.guard';
import {Reflector} from "@nestjs/core";
import {Role} from "./role.enum";

describe('RoleGuard', () => {

  let role;

  const reflectorMock = {
    getAllAndOverride: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    getAllAndMerge: jest.fn()
  } as jest.Mocked<Reflector>;

  const switchToHttp = {
    getRequest: jest.fn(),
  };

  const ctxMock = {
    switchToHttp: jest.fn().mockImplementation(() => switchToHttp),
    getHandler: jest.fn(),
    getClass: jest.fn(),
  }

  beforeAll(() => {
    role = new RoleGuard(reflectorMock);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(role).toBeDefined();
  });

  it('should return true when not exist some component with role', () => {
    const result = role.canActivate(ctxMock);
    expect(result).toBeTruthy();
    expect(reflectorMock.getAllAndOverride).toHaveBeenCalledTimes(1);
  });


  it('should return true when exist some component with role and its valid', () => {
    reflectorMock.getAllAndOverride.mockReturnValue(Object.values(Role));
    switchToHttp.getRequest.mockReturnValue({
      jwt: {
        scope: ['admin:account']
      }
    })
    const result = role.canActivate(ctxMock);
    expect(result).toBeTruthy();
    expect(reflectorMock.getAllAndOverride).toHaveBeenCalledTimes(1);
  });

  it('should return false when exist some component with role and its not valid', () => {
    reflectorMock.getAllAndOverride.mockReturnValue(Object.values(Role));
    switchToHttp.getRequest.mockReturnValue({
      jwt: {
        scope: ['admin:users']
      }
    })
    const result = role.canActivate(ctxMock);
    expect(result).toBeFalsy();
    expect(reflectorMock.getAllAndOverride).toHaveBeenCalledTimes(1);
  });

});
