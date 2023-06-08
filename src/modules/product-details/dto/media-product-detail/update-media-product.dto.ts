import { Type } from "class-transformer";
import { ProductDetail } from "../../entities/product-detail.entity";
import { Media } from "src/modules/medias/media.entity";

export class UpdateMediaProductDetailDto {
    @Type(() => ProductDetail) 
    productDetailId: ProductDetail | number;

    @Type(() => Media) 
    mediaId: Media | number ;
}