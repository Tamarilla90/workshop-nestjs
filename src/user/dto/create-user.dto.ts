import {IsDefined, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;


    @IsDefined()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsDefined()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
