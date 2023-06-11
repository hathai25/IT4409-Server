import { Expose, Type } from "class-transformer";
import { BaseDto } from "src/common/dtos";
import { MediaProductDetailDto } from "../media-product-detail";
import { ProductDto } from "src/modules/products/dto";
import { AttributeDefaultDto } from "../product-attribute-default";
import { AttributeProductValueDto } from "../attribute-product-value";

export class ProductDetailDto extends BaseDto {
    @Expose()
    @Type(() => MediaProductDetailDto)
    medias: MediaProductDetailDto[] | number[]

    @Expose()
    @Type(() => AttributeDefaultDto)
    attributeDefaults: AttributeDefaultDto[] | number[];

    @Expose()
    @Type(() => AttributeProductValueDto)
    attributeValues: AttributeProductValueDto[] | number[]

    @Expose()
    @Type(() => ProductDto)
    productId: ProductDto | number;
}