import {
    IsBoolean,
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
    @IsBoolean()
    readonly isActivity?: boolean;

    @IsOptional()
    @IsUrl()
    readonly avatar?: string;
}
