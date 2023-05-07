import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
