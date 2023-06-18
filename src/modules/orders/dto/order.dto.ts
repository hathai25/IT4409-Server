import { Expose, Type } from "class-transformer";
import { BaseWithDeletedDto } from "src/common/dtos";
import { BaseCreatedAnUpdatedEntity } from "src/common/entities";
import { OrderStatus, PaymentType } from "src/common/enum";
import { AttributeDefaultDto } from "src/modules/product-details/dto/product-attribute-default";

export class OrderDto extends BaseWithDeletedDto {
    @Expose()
    status: OrderStatus;

    @Expose()
    paymentType: PaymentType

    @Expose()
    totalMoney: number;

    @Expose()
    isPay: boolean;

    @Expose()
    owerId: number;

    @Expose()
    updatedBy: number;

    @Expose()
    deletedBy: number;

    @Expose()
    isCancelByUser: boolean;

    @Expose()
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
}

export class OrderItemDto extends BaseCreatedAnUpdatedEntity {
    @Expose()
    number: number;

    @Expose()
    @Type(() => AttributeDefaultDto)
    productAttributeDefault: AttributeDefaultDto
}