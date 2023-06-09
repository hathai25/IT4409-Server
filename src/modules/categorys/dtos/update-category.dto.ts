import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Category } from '../category.entity';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    order: number;

    @IsOptional()
    @Type(() => Category)
    parentCategory: Category | number | null;
}
