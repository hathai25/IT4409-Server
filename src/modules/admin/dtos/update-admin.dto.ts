import { IsArray, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/common/enum';

export class UpdateAdminDto {
    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @IsArray()
    roles?: Role[];
}
