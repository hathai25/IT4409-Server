import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ProductDetail } from '../../entities/product-detail.entity';
import { Media } from 'src/modules/medias/media.entity';

export class CreateAttributeDefaultDto {
    @IsString()
    @IsNotEmpty()
    color: string;

    @IsString()
    @IsNotEmpty()
    size: string;

    @IsInt()
    @Min(0)
    inventoryNumber: number;

    @Type(() => Media)
    mediaId?: Media | number;

    @Type(() => ProductDetail)
    productDetailId: ProductDetail | number;
}
