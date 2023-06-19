import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateProductDetailDto {
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    medias?: string[];
}
