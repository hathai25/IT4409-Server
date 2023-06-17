import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { AttributeProduct } from './entities/attribute-product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttributeProductDto } from './dto/attribute-product/create-attribute-product.dto';
import { UpdateAttributeProductDto } from './dto/attribute-product/update-attribute-product.dto';
import { FilterAttributeDto } from './dto/attribute-product/filter-attribute.dto';

@Injectable()
export class AttributeProductsService {
    constructor(
        @InjectRepository(AttributeProduct)
        private readonly attributProductRepository: Repository<AttributeProduct>,
    ) {}

    async createAttributeProduct(
        createAttributeProduct: CreateAttributeProductDto,
    ): Promise<AttributeProduct> {
        const findAttribute = await this.attributProductRepository.find({
            where: { name: createAttributeProduct.name },
        });
        if (findAttribute.length !== 0) {
            throw new BadRequestException('name is exsit in system');
        }
        const newAttribute = this.attributProductRepository.create(
            createAttributeProduct,
        );
        return await this.attributProductRepository.save(newAttribute);
    }

    async updateAttributeProductById(
        id: number,
        updateAttributeProduct: UpdateAttributeProductDto,
    ): Promise<AttributeProduct> {
        const findAttribute = await this.attributProductRepository.findOne({
            where: { id: id },
        });
        if (!findAttribute) {
            throw new NotFoundException(
                ' attribute with id is not found in system',
            );
        }

        const updateAttribute = await this.attributProductRepository.save({
            ...findAttribute,
            ...updateAttributeProduct,
        });

        return updateAttribute;
    }

    async deleteAttributeById(id: number): Promise<AttributeProduct> {
        const findAttribute = await this.attributProductRepository.findOne({
            where: { id: id },
        });
        if (!findAttribute) {
            throw new NotFoundException(
                ' attribute with id is not found in system',
            );
        }
        const destroyAttribute = await this.attributProductRepository.remove(
            findAttribute,
        );

        return destroyAttribute;
    }

    async getAttributeById(id: number): Promise<AttributeProduct> {
        const attribute = await this.attributProductRepository.findOne({
            where: { id: id },
        });
        if (!attribute) {
            throw new NotFoundException(
                ' attribute with id is not found in system',
            );
        }

        return attribute;
    }

    async getAllAttribute(): Promise<AttributeProduct[]> {
        const attribute = await this.attributProductRepository.find();
        return attribute;
    }

    async countAttribute(
        filterAttributeDto: FilterAttributeDto,
    ): Promise<number> {
        const total = await this.attributProductRepository.count({
            where: filterAttributeDto.options,
        });
        return total;
    }
}
