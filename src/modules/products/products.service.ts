import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {}

    async createProduct(
        createProductdto: CreateProductDto,
        idAdmin: number,
    ): Promise<Product> {
        const newProduct = this.productsRepository.create(createProductdto);
        newProduct.createdBy = idAdmin;
        newProduct.categories = createProductdto.categories;
        return await this.productsRepository.save(newProduct);
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
        currProduct.updatedBy = idAdmin;
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
            relations: ['thumbnail'],
        });
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { id: id },
            withDeleted: true,
            relations: ['thumbnail', 'categories'],
        });
        console.log(product);
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
            relations: ['thumbnail'],
            withDeleted: true,
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
