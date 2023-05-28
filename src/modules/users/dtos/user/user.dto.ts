import { Exclude, Expose, Type } from 'class-transformer';
import { Address } from '../../entity';

export class UserDto {
    @Expose()
    readonly id: number;

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
    @Type(() => Address)
    address?: Address[];
}
