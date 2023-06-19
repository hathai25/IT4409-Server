import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Min,
    ValidateNested,
} from 'class-validator';
import { PaymentType } from 'src/common/enum';

export class CreateOrderDto {
    @IsEnum(PaymentType)
    @IsNotEmpty()
    paymentType: PaymentType;

    @IsNumber()
    totalMoney: number;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    orderItems: CreateOrderItemDto[];

    @IsNumber()
    address: number;
}

export class CreateOrderItemDto {
    @IsNumber()
    @IsNotEmpty()
    productAttributeDefault: number;

    @IsNumber()
    @Min(1)
    number: number;
}
