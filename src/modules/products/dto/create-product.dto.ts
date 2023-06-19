import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

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

    @IsString()
    @IsNotEmpty()
    thumbnail: string;

    @IsArray()
    @IsNumber({}, { each: true })
    categoriesId: number[];
}
