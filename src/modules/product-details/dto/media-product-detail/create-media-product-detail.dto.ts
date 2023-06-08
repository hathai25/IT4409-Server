import { Type } from "class-transformer";
import { ProductDetail } from "../../entities/product-detail.entity";
import { Media } from "src/modules/medias/media.entity";
import { IsOptional } from "class-validator";

export class CreateMediaProductDetailDto {
    @IsOptional()
    @Type(() => ProductDetail) 
    productDetailId?: ProductDetail | number;

    @IsOptional()
    @Type(() => Media) 
    mediaId?: Media | number ;
}