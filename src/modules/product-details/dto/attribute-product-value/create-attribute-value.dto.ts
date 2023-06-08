import { IsNotEmpty, IsString } from "class-validator";
import { ProductDetail } from "../../entities/product-detail.entity";
import { Type } from "class-transformer";
import { AttributeProduct } from "../../entities/attribute-product.entity";

export class CreateAtrributeValueDto {
    @IsString()
    @IsNotEmpty()
    value: string;

    @Type(() => ProductDetail)
    productDetailId: ProductDetail | number;

    @Type(() => AttributeProduct) 
    attributeId: AttributeProduct | number ;
}