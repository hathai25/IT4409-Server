import { Exclude, Expose, Type } from 'class-transformer';
import { Address } from '../../entity';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { AddressDto } from '../address/address.dto';

export class UserDto extends BaseWithDeletedDto {
    @Expose()
    readonly email: string;

    @Expose()
    readonly username: string;

    @Exclude()
    readonly password: string;

    @Expose()
    phone: string;

    @Expose()
    avatar: string;

    @Expose()
    isActivity: boolean;

    @Expose()
    @Type(() => AddressDto)
    address?: AddressDto[];
}
