import {
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class UpdateAddressDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    country?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    provice?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    district?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    commune?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    detail?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fullname?: string;

    @IsOptional()
    @IsPhoneNumber('VN')
    phone?: string;
}
