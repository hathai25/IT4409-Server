import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetailMedia } from './entities/product-detail-media.entity';
import { Repository } from 'typeorm';
import {
    CreateMediaProductDetailDto,
    UpdateMediaProductDetailDto,
} from './dto/media-product-detail';

@Injectable()
export class MediaProductDetailsService {
    constructor(
        @InjectRepository(ProductDetailMedia)
        private readonly mediaProductDetailRepoitory: Repository<ProductDetailMedia>,
    ) {}

    async createMediaProductDetail(
        createMediaProductDetailDto: CreateMediaProductDetailDto,
    ): Promise<ProductDetailMedia> {
        const findMediaProductDetail =
            await this.mediaProductDetailRepoitory.findOne({
                where: {
                    productDetailId:
                        createMediaProductDetailDto.productDetailId,
                    mediaId: createMediaProductDetailDto.mediaId,
                },
            });
        if (findMediaProductDetail) {
            throw new BadRequestException('the media is exist in existem');
        }
        const newMediaProductDetail = this.mediaProductDetailRepoitory.create(
            createMediaProductDetailDto,
        );
        return await this.mediaProductDetailRepoitory.save(
            newMediaProductDetail,
        );
    }

    async updateMediaProductDetail(
        id: number,
        updateMediaProductDetailDto: UpdateMediaProductDetailDto,
    ): Promise<ProductDetailMedia> {
        const findMeidaProductDetail =
            await this.mediaProductDetailRepoitory.findOne({
                where: { id: id },
            });
        if (!findMeidaProductDetail) {
            throw new NotFoundException('not found media in system');
        }
        return await this.mediaProductDetailRepoitory.save({
            ...findMeidaProductDetail,
            ...updateMediaProductDetailDto,
        });
    }

    async destroyMediaProductDetailById(
        id: number,
    ): Promise<ProductDetailMedia> {
        const currMediaProductDetail =
            await this.mediaProductDetailRepoitory.findOne({
                where: { id: id },
            });
        if (!currMediaProductDetail) {
            throw new NotFoundException('not found media in system');
        }
        return await this.mediaProductDetailRepoitory.remove(
            currMediaProductDetail,
        );
    }

    async findMediaProductDetailById(id: number): Promise<ProductDetailMedia> {
        const mediaProductDetail =
            await this.mediaProductDetailRepoitory.findOne({
                where: { id: id },
                relations: ['mediaId'],
            });
        if (!mediaProductDetail) {
            throw new NotFoundException('not found media in system');
        }
        return mediaProductDetail;
    }
}
