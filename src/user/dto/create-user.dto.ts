import {IsDefined, IsEmail, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Paco', description: 'The name of the user'})
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({example: 'Gutierrez', description: 'The lastName of the user'})
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({example: '+61285993444', description: 'The phone of the user'})
    @IsDefined()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({example: 'paco@gmail.com', description: 'The email of the user'})
    @IsDefined()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
