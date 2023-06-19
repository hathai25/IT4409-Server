import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dto';
import { CategorysService } from '../categorys/categorys.service';
import { ProductDetailsService } from '../product-details/product-details.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        private readonly categoryService: CategorysService,
        private readonly productDetailsService: ProductDetailsService,
    ) {}

    async createProduct(
        createProductDto: CreateProductDto,
        idAdmin: number,
    ): Promise<Product> {
        const findProduct = await this.productsRepository.findOne({
            where: { name: createProductDto.name },
        });
        if (findProduct) {
            throw new BadRequestException('product name is exist in system');
        }
        const newProduct = this.productsRepository.create(createProductDto);
        newProduct.createdBy = idAdmin;
        const categories = await this.categoryService.findCategoriesByIds(
            createProductDto.categoriesId,
        );
        if (categories.length !== createProductDto.categoriesId.length) {
            throw new BadRequestException('not found categories in system');
        }
        newProduct.categories = categories;
        const saveNewProduct = await this.productsRepository.save(newProduct);
        if (!saveNewProduct) {
            throw new InternalServerErrorException('error to save product');
        }
        await this.productDetailsService.createProductDetail(
            { productId: saveNewProduct.id },
            idAdmin,
        );
        return await this.productsRepository.findOne({
            where: { id: saveNewProduct.id },
            relations: { productDetail: true },
            select: {
                productDetail: {
                    id: true,
                },
            },
        });
    }

    async updateProductById(
        id: number,
        updateProductDto: UpdateProductDto,
        idAdmin: number,
    ): Promise<Product> {
        const currProduct = await this.productsRepository.findOne({
            where: { id: id },
        });
        if (!currProduct) {
            throw new NotFoundException('product with id ' + id + ' not found');
        }

        if (currProduct.name !== updateProductDto.name) {
            const findProduct = await this.productsRepository.findOne({
                where: { name: updateProductDto.name },
            });
            if (findProduct) {
                throw new BadRequestException(
                    'product name is exist in system',
                );
            }
        }

        currProduct.updatedBy = idAdmin;
        if (updateProductDto.categoriesId) {
            const categories = await this.categoryService.findCategoriesByIds(
                updateProductDto.categoriesId,
            );
            if (categories.length !== updateProductDto.categoriesId.length) {
                throw new BadRequestException('not found categories in system');
            }
            currProduct.categories = categories;
        }
        return await this.productsRepository.save({
            ...currProduct,
            ...updateProductDto,
        });
    }

    async softDeleteProductById(id: number, adminId: number): Promise<Product> {
        const currProduct = await this.productsRepository.findOne({
            where: { id: id },
        });
        if (!currProduct) {
            throw new NotFoundException('product with id ' + id + ' not found');
        }
        const softDelete = await this.productsRepository.softRemove(
            currProduct,
        );
        softDelete.deletedBy = adminId;

        return await this.productsRepository.save(softDelete);
    }

    async recoverProductById(id: number, adminId: number): Promise<Product> {
        const currProduct = await this.productsRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!currProduct) {
            throw new NotFoundException('not found product in trash');
        }
        const recoverProduct = await this.productsRepository.recover(
            currProduct,
        );
        return await this.productsRepository.save(recoverProduct);
    }

    async destroyProductById(id: number): Promise<Product> {
        const currProduct = await this.productsRepository.findOne({
            where: { id: id, deleted: true },
            withDeleted: true,
        });
        if (!currProduct) {
            throw new NotFoundException('not found product in trash');
        }
        return await this.productsRepository.remove(currProduct);
    }

    async getAllProduct(
        filterProductDto: FilterProductDto,
    ): Promise<Product[]> {
        return await this.productsRepository.find({
            where: { ...filterProductDto.options },
            skip: filterProductDto.skip,
            take: filterProductDto.limit,
            relations: {
                categories: true,
                productDetail: true,
            },
            select: {
                categories: {
                    id: true,
                    name: true,
                    order: true,
                    parentCategory: true,
                },
                productDetail: {
                    id: true,
                },
            },
        });
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id: id },
            withDeleted: true,
            relations: {
                categories: true,
                productDetail: true,
            },
            select: {
                categories: {
                    id: true,
                    name: true,
                    order: true,
                    parentCategory: true,
                },
                productDetail: {
                    id: true,
                },
            },
        });
        if (!product) {
            throw new NotFoundException('not found product');
        }
        return product;
    }

    async getAllSoftDeleteProduct(
        filterProductDto: FilterProductDto,
    ): Promise<Product[]> {
        return await this.productsRepository.find({
            where: { ...filterProductDto.options, deleted: true },
            skip: filterProductDto.skip,
            take: filterProductDto.limit,
            withDeleted: true,
            relations: {
                categories: true,
                productDetail: true,
            },
            select: {
                categories: {
                    id: true,
                    name: true,
                    order: true,
                    parentCategory: true,
                },
                productDetail: {
                    id: true,
                },
            },
        });
    }

    async countProduct(filterProductDto: FilterProductDto): Promise<number> {
        return await this.productsRepository.count({
            where: { ...filterProductDto.options },
        });
    }

    async countSoftDeleteProduct(
        filterProductDto: FilterProductDto,
    ): Promise<number> {
        return await this.productsRepository.count({
            where: { ...filterProductDto.options, deleted: true },
            withDeleted: true,
        });
    }
}
