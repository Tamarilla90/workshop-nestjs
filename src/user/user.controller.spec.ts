import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ObjectID} from "mongodb";

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const userPlain = {
        email: 'prueba@gmail.com',
        name: 'Paco',
        lastName: 'Gutierrez',
        phone: '0000000'
    };

    const userServiceMock = {
        create: jest.fn().mockResolvedValue(userPlain),
        findAll: jest.fn().mockResolvedValue([userPlain]),
        findOne: jest.fn().mockResolvedValue(userPlain),
        update: jest.fn().mockResolvedValue(userPlain),
        remove: jest.fn().mockResolvedValue(userPlain),
    }

    const id = ObjectID('62c1ce0467598812bd2032af');

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: userServiceMock
            }],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call create user', () => {
        const dto = new CreateUserDto();
        controller.create(dto);
        expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('should call findAll user', () => {
        controller.findAll();
        expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should call findOne user', () => {
        controller.findOne(id);
        expect(service.findOne).toHaveBeenCalledWith(id);
    });

    it('should call update user', () => {
        const dto = new UpdateUserDto()
        controller.update(id, dto);
        expect(service.update).toHaveBeenCalledWith(id, dto);
    });

    it('should call create user', () => {
        controller.remove(id);
        expect(service.remove).toHaveBeenCalledWith(id);
    });
});
