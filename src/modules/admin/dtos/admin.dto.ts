import { Exclude, Expose, Type } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { Role } from 'src/common/enum';

export class AdminDto extends BaseWithDeletedDto {
    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    roles: Role[];
}
