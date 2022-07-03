import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {MongoRepository, ObjectID} from "typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: MongoRepository<User>,
    ) {
    }

    create(createUserDto: CreateUserDto) {
        const user = new User(createUserDto);
        return this.usersRepository.save(user);
    }

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: ObjectID) {
        return this.usersRepository.findOneBy({id});
    }

    update(id: ObjectID, updateUserDto: UpdateUserDto) {
        const updateUser = new User(updateUserDto);
        return this.usersRepository.update({id}, updateUser);
    }

    remove(id: ObjectID) {
        return this.usersRepository.deleteOne({id});
    }
}
