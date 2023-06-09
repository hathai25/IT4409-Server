import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from 'src/common/enum';

export class CreateAdminDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsOptional()
    @IsArray()
    roles?: Role[];
}
