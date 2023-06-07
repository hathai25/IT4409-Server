import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/dtos';
import { Category } from 'src/modules/categorys/category.entity';
import { Media } from 'src/modules/medias/media.entity';

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
    thumbnail: Media | number;

    @Expose()
    categories: Category[];
}
