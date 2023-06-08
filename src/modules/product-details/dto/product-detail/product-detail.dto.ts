import { Expose } from "class-transformer";
import { BaseWithDeletedDto } from "src/common/dtos";
import { MediaProductDetailDto } from "../media-product-detail";
import { ProductDto } from "src/modules/products/dto";

export class ProductDetailDto extends BaseWithDeletedDto {
    @Expose()
    color: string;

    @Expose()
    size: string;

    @Expose()
    inventoryNumber: number;

    @Expose()
    medias: MediaProductDetailDto[] | number[]

    @Expose()
    productId: ProductDto | number;
}