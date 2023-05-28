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
    detail?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    fullname?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;
}
