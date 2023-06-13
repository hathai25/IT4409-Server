import { Type } from 'class-transformer';
import { ProductDetail } from '../../entities/product-detail.entity';
import { Media } from 'src/modules/medias/media.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMediaProductDetailDto {
    @IsOptional()
    @Type(() => ProductDetail)
    @IsNotEmpty()
    productDetailId?: ProductDetail | number;

    @IsOptional()
    @Type(() => Media)
    @IsNotEmpty()
    mediaId?: Media | number;
}
