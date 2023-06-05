import { Expose } from 'class-transformer';
import { Category } from 'src/modules/categorys/category.entity';
import { Media } from 'src/modules/medias/media.entity';

export class ProductDto {
    @Expose()
    id: number;

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
