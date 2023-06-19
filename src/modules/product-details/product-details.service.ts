import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetail } from './entities/product-detail.entity';
import { Repository } from 'typeorm';
import {
    CreateProductDetailDto,
    UpdateProductDetailDto,
} from './dto/product-detail';

@Injectable()
export class ProductDetailsService {
    constructor(
        @InjectRepository(ProductDetail)
        private readonly productDetailRepository: Repository<ProductDetail>,
    ) {}

    async createProductDetail(
        createProductDetailDto: CreateProductDetailDto,
        adminId: number,
    ): Promise<ProductDetail> {
        if (!adminId) {
            throw new BadRequestException('not admin id in the request');
        }
        const findProductDetail = await this.productDetailRepository.findOne({
            where: { productId: { id: createProductDetailDto.productId } },
        });
        if (findProductDetail) {
            throw new BadRequestException('product detail is exist in system');
        }
        const newProductDetail = this.productDetailRepository.create(
            createProductDetailDto,
        );
        newProductDetail.createdBy = adminId;
        return await this.productDetailRepository.save(newProductDetail);
    }

    async updateProductDetailbyId(
        id: number,
        updateProductDetailDto: UpdateProductDetailDto,
        adminId: number,
    ): Promise<ProductDetail> {
        if (!id || !adminId) {
            throw new BadRequestException(
                'id product detail or admin not exist in request',
            );
        }
        const findProductDetail = await this.productDetailRepository.findOne({
            where: { id: id },
        });
        if (!findProductDetail) {
            throw new NotFoundException('not found product detail');
        }
        findProductDetail.updatedBy = adminId;
        return await this.productDetailRepository.save({
            ...findProductDetail,
            ...updateProductDetailDto,
        });
    }

    async destroyProductDetailById(id: number): Promise<ProductDetail> {
        const findProductDetail = await this.productDetailRepository.findOne({
            where: { id: id },
        });
        if (!findProductDetail) {
            throw new NotFoundException('not found product detail');
        }

        return await this.productDetailRepository.remove(findProductDetail);
    }

    async getProductDetailById(id: number): Promise<ProductDetail> {
        const findProductDetail = await this.productDetailRepository.findOne({
            where: { id: id },
            relations: {
                attributeDefaults: true,
                productId: {
                    categories: true,
                },
                attributeValues: {
                    attributeId: true,
                },
            },
            select: {
                attributeDefaults: {
                    id: true,
                    color: true,
                    size: true,
                    inventoryNumber: true,
                    mediaId: true,
                },
                attributeValues: {
                    id: true,
                    value: true,
                    attributeId: {
                        id: true,
                        name: true,
                    },
                },
                productId: true,
            },
        });
        if (!findProductDetail) {
            throw new NotFoundException('not found product detail');
        }
        return findProductDetail;
    }

    async getProductDetailByProductId(
        productId: number,
    ): Promise<ProductDetail> {
        const findProductDetail = await this.productDetailRepository.findOne({
            where: { productId: { id: productId } },
            relations: [
                'attributeDefaults',
                'productId',
                'attributeValues',
                'attributeValues.attributeId',
            ],
        });
        if (!findProductDetail) {
            throw new NotFoundException(
                'not found product detail with productId: ' + productId,
            );
        }
        return findProductDetail;
    }

    async getProductMediaById(id: number): Promise<ProductDetail> {
        const productDetails = await this.productDetailRepository.findOne({
            where: { id: id },
            select: { id: true, medias: true },
        });
        if (!productDetails) {
            throw new NotFoundException(
                'not found product detail with product detail: ' + id,
            );
        }
        return productDetails;
    }
}
