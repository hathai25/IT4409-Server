import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'src/common/dtos';
import { ProductDetailDto } from '../product-detail';
import { MediaDto } from 'src/modules/medias/dto';

export class AttributeDefaultDto extends BaseDto {
    @Expose()
    color: string;

    @Expose()
    size: string;

    @Expose()
    inventoryNumber: number;

    @Expose()
    mediaId?: string;

    @Expose()
    @Type(() => ProductDetailDto)
    productDetailId: ProductDetailDto | number;
}
