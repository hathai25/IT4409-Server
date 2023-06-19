import { Expose, Type } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { UserDto } from 'src/modules/users/dtos/user';

export class ReviewDto extends BaseWithDeletedDto {
    @Expose()
    content?: string;

    @Expose()
    rate?: number;

    @Expose()
    medias?: string[];

    @Expose()
    productId: number;

    @Expose()
    @Type(() => UserDto)
    owner: UserDto | number;
}
