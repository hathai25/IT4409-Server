import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { Category } from 'src/modules/categorys/category.entity';
import { Media } from 'src/modules/medias/media.entity';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    sellOfQuantity: number;

    @IsNumber()
    @Min(0)
    rate: number;

    @Type(() => Media)
    thumbnail: number | Media;

    @ValidateNested({ each: true })
    @Type(() => Category)
    categories: Category[];
}
