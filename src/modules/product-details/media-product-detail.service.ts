import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDetailMedia } from "./entities/product-detail-media.entity";
import { Repository } from "typeorm";
import { CreateMediaProductDetailDto } from "./dto/media-product-detail";

@Injectable()
export class MediaProductDetailsService {
    constructor(@InjectRepository(ProductDetailMedia) private readonly meidaProductDetailService: Repository<ProductDetailMedia>) {}
    async createMediaProductDetail(createMediaProductDetail: CreateMediaProductDetailDto): Promise<ProductDetailMedia> {
        const findMediaProductDetail = await this.meidaProductDetailService.findOne()
    }
}