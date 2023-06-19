import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'src/common/dtos';
import { CategoryDto } from 'src/modules/categorys/dtos/category.dto';
import { ProductDetailDto } from 'src/modules/product-details/dto/product-detail';

export class ProductDto extends BaseDto {
    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose()
    sellOfQuantity: number;

    @Expose()
    rate: number;

    @Expose()
    thumbnail: string;

    @Expose()
    @Type(() => ProductDetailDto)
    productDetail: ProductDetailDto;

    @Expose()
    @Type(() => CategoryDto)
    categories: CategoryDto[] | number[];
}
