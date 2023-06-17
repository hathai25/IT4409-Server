import { Type } from 'class-transformer';
import { Product } from 'src/modules/products/product.entity';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDetailDto {
    @Type(() => Product)
    @IsNotEmpty()
    productId: Product | number;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    medias?: string[]
}
