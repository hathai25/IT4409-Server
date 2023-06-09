import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

    @IsString()
    readonly username: string;
}
