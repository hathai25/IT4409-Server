import { Expose } from "class-transformer"
import { BaseCreateUpdateDto } from "src/common/dtos"
import { MediaDto } from "src/modules/medias/dto";

export class MediaProductDetailDto extends BaseCreateUpdateDto {
    @Expose()
    productDetailId: number;

    @Expose()
    mediaId: MediaDto
}