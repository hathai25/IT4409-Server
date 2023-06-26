import { Expose, Type } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { AttributeDefaultDto } from 'src/modules/product-details/dto/product-attribute-default';
import { UserDto } from 'src/modules/users/dtos/user';

export class CartItemDto extends BaseWithDeletedDto {
    @Expose()
    number: number;

    @Expose()
    @Type(() => AttributeDefaultDto)
    itemId: AttributeDefaultDto | number;

    @Expose()
    @Type(() => UserDto)
    owerId: UserDto | number;
}
