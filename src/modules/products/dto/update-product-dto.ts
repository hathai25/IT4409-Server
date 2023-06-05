import { Type } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';
import { Category } from 'src/modules/categorys/category.entity';
import { Media } from 'src/modules/medias/media.entity';

export class UpdateProductDto {
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    sellOfQuantity?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    rate?: number;

    @Type(() => Media)
    @IsOptional()
    thumbnail?: number | Media;

    @ValidateNested({ each: true })
    @Type(() => Category)
    @IsOptional()
    categories?: Category[];
}
