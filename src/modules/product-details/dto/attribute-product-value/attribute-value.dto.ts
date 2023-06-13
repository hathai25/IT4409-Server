import { Expose, Type } from 'class-transformer';
import { BaseWithDeletedDto } from 'src/common/dtos';
import { AttributeProductDto } from '../attribute-product/attribute-product.dto';
import { ProductDetailDto } from '../product-detail';

export class AttributeProductValueDto extends BaseWithDeletedDto {
    @Expose()
    value: string;

    @Expose()
    @Type(() => AttributeProductDto)
    attributeId: AttributeProductDto | number;

    @Expose()
    @Type(() => ProductDetailDto)
    productDetailId: ProductDetailDto | number;
}
