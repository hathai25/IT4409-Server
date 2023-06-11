import { Type } from "class-transformer";
import { ProductDetailMedia } from "../../entities/product-detail-media.entity";
import { ProductAttributeDefault } from "../../entities/product-attribute-default.entity";
import { Product } from "src/modules/products/product.entity";
import { IsOptional } from "class-validator";

export class UpdateProductDetailDto {
   
    @IsOptional()
    @Type(() => ProductDetailMedia) 
    medias?: ProductDetailMedia[] | number[];

    @IsOptional()
    @Type(() => ProductAttributeDefault) 
    attributeDefaults?: ProductAttributeDefault[] | number[];

    @IsOptional()
    @Type(() => Product)
    productId?: Product | number;
}