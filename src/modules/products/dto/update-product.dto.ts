import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

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

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    thumbnail?: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    categoriesId: number[];
}
