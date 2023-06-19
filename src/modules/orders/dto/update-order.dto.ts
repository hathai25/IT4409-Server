import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from 'src/common/enum';

export class UpdateOrderDto {
    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsOptional()
    @IsBoolean()
    isReview: boolean;
}
