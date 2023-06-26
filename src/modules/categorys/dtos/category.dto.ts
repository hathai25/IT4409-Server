import { Expose } from 'class-transformer';
import { Category } from '../category.entity';
import { BaseDto } from 'src/common/dtos';

export class CategoryDto extends BaseDto {
    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    order: number;

    @Expose()
    parentCategory: Category | null | number;
}
