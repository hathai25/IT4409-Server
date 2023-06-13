import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ProductAttributeDefault } from 'src/modules/product-details/entities/product-attribute-default.entity';

export class CreateCartItemDto {
    @IsNumber()
    @Min(1)
    number: number;

    @Type(() => ProductAttributeDefault)
    @IsNotEmpty()
    itemId: ProductAttributeDefault | number;
}
