import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {User} from "./entities/user.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Repository} from "typeorm";
import {ObjectID} from "mongodb";

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    const userPlain = {
        email: 'prueba@gmail.com',
        name: 'Paco',
        lastName: 'Gutierrez',
        phone: '0000000'
    };

    const id = ObjectID('62c1ce0467598812bd2032af');

    const userRepositoryMock = {
        save: jest.fn().mockResolvedValue(userPlain),
        find: jest.fn().mockResolvedValue([userPlain]),
        findOneById: jest.fn().mockResolvedValue(userPlain),
        update: jest.fn().mockResolvedValue(userPlain),
        delete: jest.fn().mockResolvedValue(userPlain),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, {
                provide: getRepositoryToken(User),
                useValue: userRepositoryMock
            }],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call create user', () => {
        const dto = new CreateUserDto();
        service.create(dto);
        expect(repository.save).toHaveBeenCalledWith(dto);
    });

    it('should call findAll user', () => {
        service.findAll();
        expect(repository.find).toHaveBeenCalledWith();
    });

    it('should call findOne user', () => {
        service.findOne(id);
        expect(repository.findOneById).toHaveBeenCalledWith(id);
    });

    it('should call update user', () => {
        const dto = new UpdateUserDto()
        service.update(id, dto);
        expect(repository.update).toHaveBeenCalledWith(id, dto);
    });

    it('should call create user', () => {
        service.remove(id);
        expect(repository.delete).toHaveBeenCalledWith(id);
    });
});
