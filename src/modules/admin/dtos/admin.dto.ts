import { Exclude, Expose, Type } from 'class-transformer';
import { Role } from 'src/common/enum';

export class AdminDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    roles: Role[];
}
