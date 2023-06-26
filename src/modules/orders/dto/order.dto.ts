import { Expose, Type } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { BaseCreatedAnUpdatedEntity } from 'src/common/entities';
import { OrderStatus, PaymentType } from 'src/common/enum';
import { AttributeDefaultDto } from 'src/modules/product-details/dto/product-attribute-default';
import { TransactionDto } from 'src/modules/transactions/dto';
import { AddressDto } from 'src/modules/users/dtos/address/address.dto';
import { UserDto } from 'src/modules/users/dtos/user';

export class OrderDto extends BaseWithDeletedDto {
    @Expose()
    status: OrderStatus;

    @Expose()
    paymentType: PaymentType;

    @Expose()
    totalMoney: number;

    @Expose()
    isReviews: boolean;

    @Expose()
    @Type(() => UserDto)
    owerId: UserDto | number;

    @Expose()
    updatedBy: number;

    @Expose()
    deletedBy: number;

    @Expose()
    isCancelByUser: boolean;

    @Expose()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];

    @Expose()
    @Type(() => AddressDto)
    address: AddressDto | number;

    @Expose()
    @Type(() => TransactionDto)
    transations: TransactionDto[] | number[];
}

export class OrderItemDto extends BaseCreatedAnUpdatedEntity {
    @Expose()
    number: number;

    @Expose()
    @Type(() => AttributeDefaultDto)
    productAttributeDefault: AttributeDefaultDto;
}
