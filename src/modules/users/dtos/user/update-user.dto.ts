import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly username?: string;

    @IsOptional()
    @IsPhoneNumber('VN')
    readonly phone?: string;

    @IsOptional()
    @IsUrl()
    readonly avatar?: string;
}
