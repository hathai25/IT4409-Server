import { Type } from "class-transformer";
import { Product } from "src/modules/products/product.entity";
import { IsNotEmpty } from "class-validator";

export class CreateProductDetailDto {
    @Type(() => Product)
    @IsNotEmpty()
    productId: Product | number;
}