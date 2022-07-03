import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ObjectID} from "typeorm";
import {Roles} from "../commons/guard/roles.decorator";
import {Role} from "../commons/guard/role.enum";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@Roles(Role.Admin)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectID) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: ObjectID, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectID) {
        return this.userService.remove(id);
    }
}
