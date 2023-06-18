import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "src/common/enum";

export class updateOrderDto {
    @IsOptional()
    @IsBoolean()
    isPay?: boolean

    @IsOptional()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}