import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
} from 'class-validator';

export class LoginAdminDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}
