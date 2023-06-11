import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'src/common/dtos';
import { CategoryDto } from 'src/modules/categorys/dtos/category.dto';
import { MediaDto } from 'src/modules/medias/dto';


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
    @Type(() => MediaDto)
    thumbnail: MediaDto;

    @Expose()
    @Type(() => CategoryDto)
    categories: CategoryDto[] | number[];
}
