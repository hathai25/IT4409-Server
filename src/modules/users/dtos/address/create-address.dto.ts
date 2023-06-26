import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    readonly country: string;

    @IsString()
    @IsNotEmpty()
    readonly provice: string;

    @IsString()
    @IsNotEmpty()
    readonly district: string;

    @IsString()
    @IsNotEmpty()
    commune: string;

    @IsString()
    @IsNotEmpty()
    readonly detail: string;

    @IsString()
    @IsNotEmpty()
    readonly fullname: string;

    @IsPhoneNumber('VN')
    readonly phone: string;
}
